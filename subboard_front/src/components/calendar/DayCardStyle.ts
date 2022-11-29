/* eslint-disable no-nested-ternary */
import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

const cardWidth = (nbRow?: number) => `clamp(0px, min(calc((100vw - 56px) / 7), calc((90vh - 48px) / ${nbRow})), 180px)`;

export const DayCardStyle = (
    theme: Theme,
    selected: boolean,
    skeleton: boolean,
    nbRow: number,
    inDisplayedMonth: boolean,
    holiday: boolean,
) => ({
    CardContainer: css({
        display: inDisplayedMonth ? 'inline-block' : 'none',
        position: 'relative',
        width: 'calc(50% - 16px)',
        height: 'calc(50vw - 16px)',
        margin: '4px',
        padding: '0',
        fontSize: '1rem',
        borderRadius: '3px',
        boxSizing: 'border-box',
        backgroundColor: selected ? theme.color.primary : theme.backgroundColor.secondary,
        overflow: 'hidden',
        boxShadow: '0px 0px 4px -2px rgba(0,0,0)',
        transition: `all ${TRANSITION_TIME.short}ms`,
        '@media only screen and (min-width: 600px)': {
            display: 'inline-block',
            width: `${cardWidth(nbRow)}`,
            height: `${cardWidth(nbRow)}`,
            opacity: inDisplayedMonth ? 1 : 0.5,
            ':hover': skeleton ? {} : {
                cursor: 'pointer',
                boxShadow: `0px 0px 5px 0px ${theme.color.primary}`,
            },
        },
    }),
    CardSkeleton: css({
        display: 'inline-block',
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0',
        '@media only screen and (min-width: 600px)': {
            opacity: inDisplayedMonth ? 1 : 0.5,
        },
    }),
    CardName: css({
        position: 'absolute',
        top: '3.5vw',
        left: '4.2vw',
        width: '60%',
        textAlign: 'left',
        fontSize: '5vw',
        color: selected ? theme.color.text : theme.color.primary,
        '@media only screen and (min-width: 600px)': {
            top: `calc(${cardWidth(nbRow)} * 0.08)`,
            left: `calc(${cardWidth(nbRow)} * 0.09)`,
            fontSize: `calc(${cardWidth(nbRow)} * 0.12)`,
        },
    }),
    CardNumber: css({
        position: 'absolute',
        top: selected ? '3.5vw' : '60%',
        right: selected ? '4.2vw' : '50%',
        width: skeleton ? '50%' : 'auto',
        height: skeleton ? '50%' : 'auto',
        fontSize: selected ? '5vw' : '20vw',
        color: holiday ? theme.color.error : theme.color.text,
        transform: selected ? 'none' : 'translate(50%, -50%)',
        transition: skeleton ? 'none' : `all ${TRANSITION_TIME.short}ms`,
        '@media only screen and (min-width: 600px)': {
            top: selected ? `calc(${cardWidth(nbRow)} * 0.08)` : '60%',
            right: selected ? `calc(${cardWidth(nbRow)} * 0.09)` : '50%',
            fontSize: selected ? `calc(${cardWidth(nbRow)} * 0.12)` : `calc(${cardWidth(nbRow)} * 0.4)`,
        },
    }),
    CardTTLogo: css({
        position: 'absolute',
        top: '60%',
        right: '50%',
        fontSize: selected ? '20vw' : '0',
        color: holiday ? theme.color.error : theme.backgroundColor.primary,
        transform: 'translate(50%, -50%)',
        transition: skeleton ? 'none' : `all ${TRANSITION_TIME.short}ms`,
        '@media only screen and (min-width: 600px)': {
            fontSize: selected ? `calc(${cardWidth(nbRow)} * 0.4)` : '0',
        },
    }),
    CardHolidayName: css({
        position: 'absolute',
        bottom: '3.5vw',
        left: '4.2vw',
        width: '60%',
        textAlign: 'left',
        fontSize: '3vw',
        color: theme.color.text,
        '@media only screen and (min-width: 600px)': {
            bottom: `calc(${cardWidth(nbRow)} * 0.08)`,
            left: `calc(${cardWidth(nbRow)} * 0.09)`,
            fontSize: `calc(${cardWidth(nbRow)} * 0.07)`,
        },
    }),
    CardSpinner: css({
        position: 'absolute',
        bottom: '3.5vw',
        right: '4.2vw',
        fontSize: '5vw',
        '@media only screen and (min-width: 600px)': {
            bottom: `calc(${cardWidth(nbRow)} * 0.08)`,
            right: `calc(${cardWidth(nbRow)} * 0.09)`,
            fontSize: `calc(${cardWidth(nbRow)} * 0.12)`,
        },
    }),
});
