import { useEffect, useState } from 'react';
import { DAYS_NAME, MONTHS_NAME } from '../Constants';

export interface Day {
    day: string;
    dayNumber: number;
    fullDate: Date;
    inDisplayedMonth: boolean;
}

export interface Calendar {
    days: Day[];
    month: string;
    year: number;
    prevMonth: () => void;
    nextMonth: () => void;
}

export default function useMyCalendar() {
    const [day] = useState<number>(new Date().getDate());
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const today = new Date(year, month, day);

    const calculDays = () => {
        const mondayOfTheWeek = day - today.getDay() + 1;
        let firstMondayOfTheMonth = mondayOfTheWeek - (Math.floor(mondayOfTheWeek / 7)) * 7;
        if (firstMondayOfTheMonth > 1) firstMondayOfTheMonth -= 7;

        const firstDayNextMonth = new Date(year, month + 1, 1);
        let lastDay: Date;
        if (firstDayNextMonth.getDay() === 1) {
            lastDay = new Date(year, month + 1, 0);
        } else {
            lastDay = new Date(year, month + 1, (8 - firstDayNextMonth.getDay()) % 7);
        }

        const newDays: Day[] = [];
        let newDate: Date;
        do {
            newDate = new Date(year, month, firstMondayOfTheMonth);
            newDays.push({
                day: DAYS_NAME[(newDate.getDay() + 6) % 7],
                dayNumber: newDate.getDate(),
                fullDate: newDate,
                inDisplayedMonth: newDate.getMonth() === month % 12,
            });
            firstMondayOfTheMonth += 1;
        } while (newDate.getTime() < lastDay.getTime());
        return newDays;
    };

    const [days, setDays] = useState<Day[]>(calculDays());

    useEffect(() => {
        setDays(calculDays());
    }, [month]);

    const prevMonth = () => {
        if ((month) === 0) {
            setYear((currYear) => currYear - 1);
        }
        setMonth((currMonth) => (currMonth + 11) % 12);
    };

    const nextMonth = () => {
        if (month === 11) {
            setYear((currYear) => currYear + 1);
        }
        setMonth((currMonth) => (currMonth + 1) % 12);
    };

    return {
        days,
        month: MONTHS_NAME[month % 12],
        year,
        prevMonth,
        nextMonth,
    } as Calendar;
}
