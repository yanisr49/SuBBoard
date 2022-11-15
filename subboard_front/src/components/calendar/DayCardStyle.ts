import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

const cardWidth = (nbRow?: number) => `clamp(0px, min(calc((100vw - 56px) / 7), calc((90vh - 48px) / ${nbRow})), 180px)`;

export const DayCardStyle = (theme: Theme, selected: boolean, loading: boolean, cardLoading: boolean, nbRow: number, inDisplayedMonth: boolean) => ({
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
        top: (selected || cardLoading) && !loading ? '3.5vw' : '60%',
        right: (selected || cardLoading) && !loading ? '4.2vw' : '50%',
        width: loading ? '50%' : 'auto',
        height: loading ? '50%' : 'auto',
        fontSize: (selected || cardLoading) && !loading ? '5vw' : '20vw',
        color: theme.color.text,
        transform: (selected || cardLoading) && !loading ? 'none' : 'translate(50%, -50%)',
        transition: loading ? 'none' : `all ${TRANSITION_TIME.short}ms`,
        '@media only screen and (min-width: 600px)': {
            top: (selected || cardLoading) && !loading ? `calc(${cardWidth(nbRow)} * 0.08)` : '60%',
            right: (selected || cardLoading) && !loading ? `calc(${cardWidth(nbRow)} * 0.09)` : '50%',
            fontSize: selected || cardLoading ? `calc(${cardWidth(nbRow)} * 0.12)` : `calc(${cardWidth(nbRow)} * 0.4)`,
        },
    }),
    CardTTLogo: css({
        position: 'absolute',
        top: '60%',
        right: '50%',
        fontSize: selected || cardLoading ? '20vw' : '0',
        color: theme.backgroundColor.primary,
        transform: 'translate(50%, -50%)',
        transition: loading ? 'none' : `all ${TRANSITION_TIME.short}ms`,
        ':active': {
            transform: 'translate(50%, -50%) scale(0.9)',
        },
        '@media only screen and (min-width: 600px)': {
            fontSize: selected || cardLoading ? `calc(${cardWidth(nbRow)} * 0.4)` : '0',
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
    CardContainer: css({
        display: inDisplayedMonth ? 'inline-block' : 'none',
        position: 'relative',
        width: 'calc(50% - 16px)',
        height: 'calc(50vw - 16px)',
        margin: '4px',
        fontSize: '1rem',
        borderRadius: '3px',
        boxSizing: 'border-box',
        backgroundColor: selected ? theme.color.primary : theme.backgroundColor.secondary,
        overflow: 'hidden',
        boxShadow: '0px 0px 4px -2px rgba(0,0,0)',
        transition: loading ? 'none' : `all ${TRANSITION_TIME.short}ms`,
        '@media only screen and (min-width: 600px)': {
            display: 'inline-block',
            width: `${cardWidth(nbRow)}`,
            height: `${cardWidth(nbRow)}`,
            opacity: inDisplayedMonth ? 1 : 0.4,
            ':hover': loading ? {} : {
                cursor: 'pointer',
                boxShadow: `0px 0px 5px 0px ${theme.color.primary}`,
                '.cardNumber': {
                    top: `calc(${cardWidth(nbRow)} * 0.08)`,
                    right: `calc(${cardWidth(nbRow)} * 0.09)`,
                    fontSize: `calc(${cardWidth(nbRow)} * 0.12)`,
                    transform: 'none',
                },
                '.cardTTLogo': {
                    fontSize: `calc(${cardWidth(nbRow)} * 0.4)`,
                },
            },
        },
    }),
});
