/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import { Calendar, CalendarItem } from 'react-calendar-hook';
import Skeleton from 'react-loading-skeleton';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import themes from '../../theme';
import { CalendarStyle } from './CalendarStyle';
import Spinner from '../../resources/common/Spinner';
import { addTTDay, removeTTDay } from '../../graphql/mutations';
import { Query } from '../../graphql/generated/graphql';
import { QUERY_NAMES } from '../../resources/Constants';

interface Props {
    item: CalendarItem;
    selected?: boolean;
    calendar: Calendar;
    loading: boolean;
}

export default function DayCard({ item, selected, calendar, loading } : Props) {
    const queryClient = useQueryClient();
    const theme = useAppSelector(selectTheme);

    const addTTDayMutation = useMutation(addTTDay, {
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_NAMES.selectedDaysCurrentMonth, calendar], (oldData: Pick<Query, 'ttDays'> | undefined) => {
                const newData = {
                    ttDays: oldData?.ttDays ?? [],
                };
                if (data.addTTDay) {
                    newData.ttDays.push(data.addTTDay);
                }
                return newData;
            });
        },
    });

    const style = CalendarStyle(themes[theme.value], selected, loading, addTTDayMutation.isLoading);

    const removeTTDayMutation = useMutation(removeTTDay, {
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_NAMES.selectedDaysCurrentMonth, calendar], (oldData: Pick<Query, 'ttDays'> | undefined) => {
                const newData: Pick<Query, 'ttDays'> | undefined = {
                    ttDays: oldData?.ttDays ?? [],
                };

                if (newData?.ttDays?.length && data.removeTTDay) {
                    newData.ttDays = newData.ttDays.filter((oldDate) => oldDate?.date
                    && data.removeTTDay?.date
                    && new Date(oldDate.date).getTime() !== new Date(data.removeTTDay?.date).getTime());
                }

                return newData;
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
                {loading ? (
                    <Skeleton
                        baseColor={themes[theme.value].backgroundColor.primary}
                        highlightColor={themes[theme.value].color.primary}
                    />
                ) : item.name }
            </div>
            <div
                className="cardNumber"
                css={style.CardNumber}
            >
                {loading ? (
                    <Skeleton
                        baseColor={themes[theme.value].backgroundColor.primary}
                        highlightColor={themes[theme.value].color.primary}
                    />
                ) : item.date}
            </div>
            <div
                className="cardTTLogo"
                css={style.CardTTLogo}
            >
                <FontAwesomeIcon icon={faHouseLaptop} />
            </div>
            <Spinner
                loading={(addTTDayMutation.isLoading || removeTTDayMutation.isLoading)}
                success={(addTTDayMutation.isSuccess || removeTTDayMutation.isSuccess)}
                color={selected ? themes[theme.value].backgroundColor.primary : themes[theme.value].color.primary}
            />
        </div>
    );
}
