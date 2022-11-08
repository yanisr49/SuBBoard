/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import {
    useCalendar, // Hook shown bellow
    dayNames, // Monday, Tuesday, etc...
    shortDayNames, // Mon, Tue, etc...
    monthNames, // January, February, etc...
    shortMonthNames, // Jan, Feb, etc...
    CalendarItem, // Type shown bellow
} from 'react-calendar-hook';
import { Query } from '../../graphql/generated/graphql';
import { addTTDay, removeTTDay } from '../../graphql/mutations';
import { fetchCurrentMonthTTDaysQuery } from '../../graphql/queries';
import { compareTTDays } from '../../resources/Utils';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import DayCard from './DayCard';
import themes from '../../theme';
import { CalendarStyle } from './CalendarStyle';

const queryNames = [
    'fetchSelectedTTDaysPreviousMonth',
    'fetchSelectedTTDaysCurrentMonth',
    'fetchSelectedTTDaysNextMonth',
];

export default function Calendar() {
    const queryClient = useQueryClient();
    const calendar = useCalendar(new Date());
    const theme = useAppSelector(selectTheme);
    const style = CalendarStyle(themes[theme.value]);

    const selectedDaysPreviousMonth = useQuery(queryNames[0], () => fetchCurrentMonthTTDaysQuery({
        month: calendar.month.number - 1 > 0 ? calendar.month.number - 1 : 12,
        year: calendar.month.number - 1 > 0 ? calendar.year : calendar.year - 1,
    }));

    const selectedDaysCurrentMonth = useQuery(queryNames[1], () => fetchCurrentMonthTTDaysQuery({
        month: calendar.month.number,
        year: calendar.year,
    }));

    const selectedDaysNextMonth = useQuery(queryNames[2], () => fetchCurrentMonthTTDaysQuery({
        month: (calendar.month.number + 1) % 13,
        year: calendar.month.number + 1 < 12 ? calendar.year : calendar.year + 1,
    }));

    const addTTDayMutation = useMutation(addTTDay, {
        onSuccess: (data) => {
            if (data.addTTDay) {
                let queryName = queryNames[1];
                if (data.addTTDay.month !== calendar.date.getMonth() + 1) {
                    queryName = compareTTDays(data.addTTDay, calendar.date) < 0 ? queryNames[0] : queryName;
                    queryName = compareTTDays(data.addTTDay, calendar.date) > 0 ? queryNames[2] : queryName;
                }

                queryClient.setQueryData(queryName, (oldData: Pick<Query, 'ttDays'> | undefined) => {
                    const newData = {
                        ttDays: oldData?.ttDays ?? [],
                    };
                    if (data.addTTDay) {
                        newData.ttDays.push(data.addTTDay);
                    }
                    return newData;
                });
            }
        },
    });

    const removeTTDayMutation = useMutation(removeTTDay, {
        onSuccess: (data) => {
            if (data.removeTTDay) {
                let queryName = queryNames[1];
                if (data.removeTTDay.month !== calendar.date.getMonth() + 1) {
                    queryName = compareTTDays(data.removeTTDay, calendar.date) < 0 ? queryNames[0] : queryName;
                    queryName = compareTTDays(data.removeTTDay, calendar.date) > 0 ? queryNames[2] : queryName;
                }

                queryClient.setQueryData(queryName, (oldData: Pick<Query, 'ttDays'> | undefined) => {
                    const newData: Pick<Query, 'ttDays'> | undefined = {
                        ttDays: oldData?.ttDays ?? [],
                    };

                    if (newData?.ttDays && data.removeTTDay) {
                        newData.ttDays = newData.ttDays.filter((oldDay) => oldDay?.day !== data.removeTTDay?.day
                        || oldDay?.month !== data.removeTTDay?.month
                        || oldDay?.year !== data.removeTTDay?.year);
                    }

                    return newData;
                });
            }
        },
    });

    const getSelectedDays = (day: CalendarItem): UseQueryResult<Pick<Query, 'ttDays'>, unknown> => {
        let selectedDays: UseQueryResult<Pick<Query, 'ttDays'>, unknown>;
        switch (day.fullDate.getMonth() + 1) {
        case calendar.month.number - 1:
            selectedDays = selectedDaysPreviousMonth;
            break;
        case calendar.month.number:
            selectedDays = selectedDaysCurrentMonth;
            break;
        case calendar.month.number + 1:
            selectedDays = selectedDaysNextMonth;
            break;
        default:
            selectedDays = selectedDaysCurrentMonth;
        }

        return selectedDays;
    };

    const handleClickDayCard = (day: CalendarItem, selected: boolean) => {
        if (!selected) {
            addTTDayMutation.mutate({
                day: day.date, month: day.fullDate.getMonth() + 1, year: day.fullDate.getFullYear(),
            });
        } else {
            removeTTDayMutation.mutate({
                day: day.date, month: day.fullDate.getMonth() + 1, year: day.fullDate.getFullYear(),
            });
        }
    };

    const isDaySelected = (day: CalendarItem): boolean => {
        const selectedDays = getSelectedDays(day);

        if (!selectedDays.data?.ttDays || selectedDays.data.ttDays.length === 0) {
            return false;
        }
        return selectedDays.data?.ttDays?.findIndex((selectedDay) => selectedDay?.day === day.date
            && selectedDay.month === day.fullDate.getMonth() + 1
            && selectedDay.year === day.fullDate.getFullYear()) > -1;
    };

    const handlePreviousMonth = () => {
        calendar.prevMonth();
        selectedDaysPreviousMonth.refetch();
        queryClient.setQueryData(queryNames[1], selectedDaysPreviousMonth.data);
        queryClient.setQueryData(queryNames[2], selectedDaysCurrentMonth.data);
    };

    const handleNextMonth = () => {
        calendar.nextMonth();
        selectedDaysNextMonth.refetch();
        queryClient.setQueryData(queryNames[0], selectedDaysCurrentMonth.data);
        queryClient.setQueryData(queryNames[1], selectedDaysNextMonth.data);
    };

    return (
        <div css={style.CalendarContainer}>
            <div css={style.CalendarHeaderContainer}>
                <span onClick={handlePreviousMonth}>{'<<<'}</span>
                {calendar.month.name}
                <span onClick={handleNextMonth}>{'>>>'}</span>
            </div>
            {calendar.items.map((item) => (
                <DayCard
                    key={item.fullDate.toString()}
                    name={item.name}
                    day={item.date}
                    onClick={() => handleClickDayCard(item, isDaySelected(item))}
                    selected={isDaySelected(item)}
                />
            ))}
        </div>
    );
}
