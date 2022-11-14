import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

const cardWidth = (nbRow?: number) => `clamp(0px, min(calc((100vw - 56px) / 7), calc((90vh - 48px) / ${nbRow})), 180px)`;

export const CalendarStyle = (theme: Theme, selected?: boolean, loading?: boolean, cardLoading?: boolean, nbRow?: number) => ({
    CalendarHeaderContainer: css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        width: '100%',
        height: '10%',
        padding: '1vw 3vw',
        textAlign: 'center',
        fontSize: '10vw',
        color: theme.color.text,
        backgroundColor: theme.color.primary,
        boxShadow: '0px 0px 3px 0px rgb(0,0,0)',
        boxSizing: 'border-box',
        '@media only screen and (min-width: 600px)': {
            justifyContent: 'center',
            position: 'static',
            fontSize: '7vh',
            boxShadow: 'none',
            color: theme.color.primary,
            backgroundColor: 'transparent',
        },
    }),
    MonthName: css({
        display: 'inline-block',
        '@media only screen and (min-width: 600px)': {
            width: '40vh',
        },
    }),
    CardName: css({
        position: 'absolute',
        top: '3.5vw',
        left: '4.2vw',
        width: '60%',
        textAlign: 'left',
        fontSize: '10.5vw',
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
        fontSize: (selected || cardLoading) && !loading ? '10.5vw' : '42vw',
        color: theme.color.text,
        transform: (selected || cardLoading) && !loading ? 'none' : 'translate(50%, -50%)',
        transition: `all ${TRANSITION_TIME.short}ms`,
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
        fontSize: selected || cardLoading ? '42vw' : '0',
        color: theme.backgroundColor.primary,
        transform: 'translate(50%, -50%)',
        transition: `all ${TRANSITION_TIME.short}ms`,
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
        fontSize: '7vw',
        '@media only screen and (min-width: 600px)': {
            bottom: `calc(${cardWidth(nbRow)} * 0.08)`,
            right: `calc(${cardWidth(nbRow)} * 0.09)`,
            fontSize: `calc(${cardWidth(nbRow)} * 0.12)`,
        },
    }),
    CardContainer: css({
        display: 'inline-block',
        position: 'relative',
        width: 'calc(100% - 8px)',
        height: 'calc(100vw - 8px)',
        margin: '4px',
        fontSize: '1rem',
        borderRadius: '3px',
        boxSizing: 'border-box',
        backgroundColor: selected ? theme.color.primary : theme.backgroundColor.secondary,
        overflow: 'hidden',
        boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.50)',
        transition: `all ${TRANSITION_TIME.short}ms`,
        '@media only screen and (min-width: 600px)': {
            width: `${cardWidth(nbRow)}`,
            height: `${cardWidth(nbRow)}`,
            ':hover': {
                cursor: 'pointer',
                boxShadow: `0px 0px 15px -8px ${theme.color.primary}`,
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
    CalendarContainer: css({
        width: '100%',
        maxWidth: `min(1324px, calc(90vh * 7 / ${nbRow}))`,
        height: '100%',
        textAlign: 'center',
        fontSize: '0',
        boxSizing: 'border-box',
    }),
});
