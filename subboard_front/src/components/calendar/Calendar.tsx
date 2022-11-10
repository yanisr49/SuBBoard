/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import { useQuery } from 'react-query';
import {
    useCalendar, // Hook shown bellow
    dayNames, // Monday, Tuesday, etc...
    shortDayNames, // Mon, Tue, etc...
    monthNames, // January, February, etc...
    shortMonthNames, // Jan, Feb, etc...
    CalendarItem, // Type shown bellow
} from 'react-calendar-hook';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { fetchTTDaysQuery } from '../../graphql/queries';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import DayCard from './DayCard';
import themes from '../../theme';
import { CalendarStyle } from './CalendarStyle';
import { QUERY_NAMES } from '../../resources/Constants';

export default function Calendar() {
    const calendar = useCalendar(new Date());
    const theme = useAppSelector(selectTheme);
    const style = CalendarStyle(themes[theme.value]);

    const selectedDaysCurrentMonth = useQuery([QUERY_NAMES.selectedDaysCurrentMonth, calendar], () => fetchTTDaysQuery({
        startDate: calendar.items[0].fullDate,
        endDate: calendar.items.slice(-1)[0].fullDate,
    }));

    const isDaySelected = (day: CalendarItem): boolean => {
        if (!selectedDaysCurrentMonth.data?.ttDays || selectedDaysCurrentMonth.data.ttDays.length === 0) {
            return false;
        }

        return selectedDaysCurrentMonth.data?.ttDays?.findIndex((selectedDay) => selectedDay?.date
            && new Date(selectedDay.date).getTime() === new Date(day.fullDate).getTime()) > -1;
    };

    const rows: EmotionJSX.Element[][] = [];
    for (let i = 0; i < 4 || (calendar.items.length > i * 7 && calendar.items[i * 7].date > 14); i += 1) {
        rows.push([]);
        calendar.items.slice(i * 7, i * 7 + 7).map((item) => rows[i].push(
            <DayCard
                key={item.fullDate.toString()}
                item={item}
                selected={isDaySelected(item)}
                calendar={calendar}
            />,
        ));
    }

    return (
        <div css={style.CalendarContainer}>
            <div css={style.CalendarHeaderContainer}>
                <span onClick={() => calendar.prevMonth()}>{'<<<'}</span>
                {calendar.month.name}
                <span onClick={() => calendar.nextMonth()}>{'>>>'}</span>
            </div>
            {}
            {rows.map((row) => <div css={style.CardRow}>{row}</div>)}
        </div>
    );
}
