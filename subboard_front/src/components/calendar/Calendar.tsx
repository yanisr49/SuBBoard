/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useQuery } from 'react-query';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchTTDaysQuery } from '../../graphql/queries';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import DayCard from './DayCard';
import { CalendarStyle } from './CalendarStyle';
import { QUERY_NAMES } from '../../resources/Constants';
import useMyCalendar from '../../resources/hooks/useMyCalendar';

export default function Calendar() {
    const calendar = useMyCalendar();
    const nbWeeksToDisplay = Math.ceil(calendar.days.length / 7);
    const theme = useAppSelector(selectTheme).value;
    const style = CalendarStyle(theme, nbWeeksToDisplay);
    const [loading, setLoading] = useState<boolean>(true);

    const selectedDaysCurrentMonth = useQuery([QUERY_NAMES.selectedDaysCurrentMonth, calendar], () => fetchTTDaysQuery({
        startDate: calendar.days[0].fullDate,
        endDate: calendar.days.slice(-1)[0].fullDate,
    }), {
        onSuccess: () => setLoading(false),
    });

    const isDaySelected = (day: Date): boolean => {
        if (!selectedDaysCurrentMonth.data?.ttDays || selectedDaysCurrentMonth.data.ttDays.length === 0) {
            return false;
        }

        return selectedDaysCurrentMonth.data?.ttDays?.findIndex((selectedDay) => selectedDay?.date
            && new Date(selectedDay.date).getTime() === day.getTime()) > -1;
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
                    <div css={style.MonthName}>{`${calendar.month} ${calendar.year}`}</div>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={handleNextMonth}
                        cursor="pointer"
                    />
                </div>
                {calendar.days.slice(0, nbWeeksToDisplay * 7).map((item) => (
                    <DayCard
                        key={item.fullDate.toString()}
                        item={item}
                        selected={isDaySelected(item.fullDate)}
                        calendar={calendar}
                        nbWeeks={nbWeeksToDisplay}
                        loading={loading}
                    />
                ))}
            </>
        </div>
    );
}
