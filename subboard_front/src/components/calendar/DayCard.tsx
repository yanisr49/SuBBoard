/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import { Calendar, CalendarItem } from 'react-calendar-hook';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment-ferie-fr';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import Spinner from '../../resources/common/Spinner';
import { addTTDay, removeTTDay } from '../../graphql/mutations';
import { Query, TtDays } from '../../graphql/generated/graphql';
import { QUERY_NAMES } from '../../resources/Constants';
import { DayCardStyle } from './DayCardStyle';

interface Props {
    item: CalendarItem;
    selected: boolean;
    calendar: Calendar;
    nbWeeks: number;
    loading: boolean;
}

export default function DayCard({ item, selected, calendar, nbWeeks, loading } : Props) {
    const queryClient = useQueryClient();
    const theme = useAppSelector(selectTheme).value;
    const holiday = moment(item.fullDate);

    const addTTDayMutation = useMutation(addTTDay, {
        onMutate: async (data) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
            });

            // Snapshot the previous value
            const previousData: Pick<Query, 'ttDays'> | undefined = queryClient.getQueryData([QUERY_NAMES.selectedDaysCurrentMonth, calendar]);

            const newData = queryClient.setQueryData(
                [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
                (oldData: Pick<Query, 'ttDays'> | undefined) => {
                    if (oldData?.ttDays) {
                        return {
                            ttDays: [
                                ...oldData.ttDays,
                        {
                            date: data,
                        } as TtDays,
                            ],
                        };
                    }
                    return {
                        ttDays: [] as TtDays[],
                    };
                },
            );

            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            queryClient.setQueryData(
                [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
                context?.previousData,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
            });
        },
    });

    const removeTTDayMutation = useMutation(removeTTDay, {
        onMutate: async (data) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
            });

            const previousData: Pick<Query, 'ttDays'> | undefined = queryClient.getQueryData([QUERY_NAMES.selectedDaysCurrentMonth, calendar]);

            const newData = queryClient.setQueryData(
                [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
                (oldData: Pick<Query, 'ttDays'> | undefined) => {
                    if (data) {
                        return {
                            ttDays: oldData?.ttDays?.filter((oldDate) => new Date(oldDate?.date).getTime() !== new Date(data).getTime()) ?? [],
                        };
                    }
                    return {
                        ttDays: [] as TtDays[],
                    };
                },
            );

            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            queryClient.setQueryData(
                [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
                context?.previousData,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_NAMES.selectedDaysCurrentMonth, calendar],
            });
        },
    });

    const handleClick = () => {
        if (!selected) {
            addTTDayMutation.mutate(item.fullDate);
        } else {
            removeTTDayMutation.mutate(item.fullDate);
        }
    };

    const inDisplayedMonth = item.fullDate.getMonth() === calendar.items[6].fullDate.getMonth();

    const style = DayCardStyle(
        theme,
        selected,
        loading,
        addTTDayMutation.isLoading || removeTTDayMutation.isLoading,
        nbWeeks,
        inDisplayedMonth,
        holiday.isFerie(),
    );

    return (
        <div
            css={style.CardContainer}
            onClick={handleClick}
            onKeyDown={(ev) => ev.key === 'Enter' && handleClick()}
            role="button"
            tabIndex={0}
        >
            <div
                className="cardName"
                css={style.CardName}
            >
                {loading ? <Skeleton /> : item.name }
            </div>
            <div
                className="cardNumber"
                css={style.CardNumber}
            >
                {loading ? <Skeleton /> : item.date}
            </div>
            <div
                className="cardTTLogo"
                css={style.CardTTLogo}
            >
                <FontAwesomeIcon icon={faHouseLaptop} />
            </div>
            <div
                className="cardHolidayName"
                css={style.CardHolidayName}
            >
                {holiday.getFerie()}
            </div>
            <Spinner
                loading={(addTTDayMutation.isLoading || removeTTDayMutation.isLoading)}
                success={(addTTDayMutation.isSuccess || removeTTDayMutation.isSuccess)}
                color={selected ? theme.backgroundColor.primary : theme.color.primary}
                cssStyle={style.CardSpinner}
            />
        </div>
    );
}
