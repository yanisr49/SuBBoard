/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import { Calendar, CalendarItem } from 'react-calendar-hook';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import { CalendarStyle } from './CalendarStyle';
import Spinner from '../../resources/common/Spinner';
import { addTTDay, removeTTDay } from '../../graphql/mutations';
import { Query } from '../../graphql/generated/graphql';
import { QUERY_NAMES } from '../../resources/Constants';

interface Props {
    item: CalendarItem;
    selected: boolean;
    calendar: Calendar;
    loading: boolean;
}

export default function DayCard({ item, selected, calendar, loading } : Props) {
    const queryClient = useQueryClient();
    const theme = useAppSelector(selectTheme).value;
    const [isSelected, setSelected] = useState<boolean>(selected);

    const addTTDayMutation = useMutation(addTTDay, {
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_NAMES.selectedDaysCurrentMonth, calendar], (oldData: Pick<Query, 'ttDays'> | undefined) => {
                const newData = {
                    ttDays: oldData?.ttDays ?? [],
                };
                if (data.addTTDay) {
                    newData.ttDays.push(data.addTTDay);
                }

                setSelected(!isSelected);

                return newData;
            });
        },
    });

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

                setSelected(!isSelected);

                return newData;
            });
        },
    });

    const style = CalendarStyle(theme, isSelected, loading, addTTDayMutation.isLoading || removeTTDayMutation.isLoading, 5);

    const handleClick = () => {
        if (!isSelected) {
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
                        baseColor={theme.backgroundColor.primary}
                        highlightColor={theme.color.primary}
                    />
                ) : item.name }
            </div>
            <div
                className="cardNumber"
                css={style.CardNumber}
            >
                {loading ? (
                    <Skeleton
                        baseColor={theme.backgroundColor.primary}
                        highlightColor={theme.color.primary}
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
                color={isSelected ? theme.backgroundColor.primary : theme.color.primary}
                cssStyle={style.CardSpinner}
            />
        </div>
    );
}
