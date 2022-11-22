/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useQuery } from 'react-query';
import {
    useCalendar, // Hook shown bellow
    CalendarItem, // Type shown bellow
} from 'react-calendar-hook';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchTTDaysQuery } from '../../graphql/queries';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import DayCard from './DayCard';
import { CalendarStyle } from './CalendarStyle';
import { QUERY_NAMES } from '../../resources/Constants';

export default function Calendar() {
    const calendar = useCalendar(new Date());
    const nbWeeksToDisplay = Math.ceil((calendar.items.slice(7).findIndex((value) => value.date === 1) + 7) / 7);
    const theme = useAppSelector(selectTheme).value;
    const style = CalendarStyle(theme, nbWeeksToDisplay);
    const [loading, setLoading] = useState<boolean>(true);

    const selectedDaysCurrentMonth = useQuery([QUERY_NAMES.selectedDaysCurrentMonth, calendar], () => fetchTTDaysQuery({
        startDate: calendar.items[0].fullDate,
        endDate: calendar.items.slice(-1)[0].fullDate,
    }), {
        onSuccess: () => setLoading(false),
    });

    const isDaySelected = (day: CalendarItem): boolean => {
        if (!selectedDaysCurrentMonth.data?.ttDays || selectedDaysCurrentMonth.data.ttDays.length === 0) {
            return false;
        }

        return selectedDaysCurrentMonth.data?.ttDays?.findIndex((selectedDay) => selectedDay?.date
            && new Date(selectedDay.date).getTime() === new Date(day.fullDate).getTime()) > -1;
    };

    const handlePrevMonth = () => {
        calendar.prevMonth();
        setLoading(true);
    };

    const handleNextMonth = () => {
        calendar.nextMonth();
        setLoading(true);
    };

    return (
        <div css={style.CalendarContainer}>
            <>
                <div css={style.CalendarHeaderContainer}>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={handlePrevMonth}
                        cursor="pointer"
                    />
                    <div css={style.MonthName}>{`${calendar.month.name} ${calendar.year}`}</div>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={handleNextMonth}
                        cursor="pointer"
                    />
                </div>
                {calendar.items.slice(0, nbWeeksToDisplay * 7).map((item) => (
                    <DayCard
                        key={item.fullDate.toString()}
                        item={item}
                        selected={isDaySelected(item)}
                        calendar={calendar}
                        nbWeeks={nbWeeksToDisplay}
                        loading={loading}
                    />
                ))}
            </>
        </div>
    );
}
