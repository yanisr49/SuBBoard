/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import themes from '../../theme';
import { CalendarStyle } from './CalendarStyle';

interface Props {
    name: string;
    day: number;
    selected?: boolean;
    onClick: () => void;
}

export default function DayCard({ name, day, selected, onClick } : Props) {
    const theme = useAppSelector(selectTheme);
    const style = CalendarStyle(themes[theme.value], selected);

    return (
        <div
            css={style.CardContainer}
            onClick={onClick}
            onKeyDown={(ev) => ev.key === 'Enter' && onClick()}
            role="button"
            tabIndex={0}
        >
            {`${name} ${day}`}
            {selected && <FontAwesomeIcon icon={faHouseLaptop} size="3x" />}
        </div>
    );
}
