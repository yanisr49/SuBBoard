import { css, Theme } from '@emotion/react';
import { PALETTE, TRANSITION_TIME } from '../../resources/Constants';

export const CalendarStyle = (theme: Theme, selected?: boolean, loading?: boolean, cardLoading?: boolean) => ({
    CalendarHeaderContainer: css({
        position: 'sticky',
        top: '6%',
        boxShadow: '0px 0px 3px 0px rgb(0,0,0)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        padding: '1vw 3vw',
        textAlign: 'center',
        boxSizing: 'border-box',
        color: theme.color.text,
        backgroundColor: theme.color.primary,
        fontSize: '10vw',
        zIndex: 1000,
        '@media only screen and (min-width: 600px)': {
            position: 'static',
            boxShadow: 'none',
            fontSize: '5vw',
            justifyContent: 'center',
            color: theme.color.primary,
            backgroundColor: 'transparent',
        },
        '@media (min-width: 1324px)': {
            fontSize: '66.2px',
        },
    }),
    MonthName: css({
        display: 'inline-block',
        '@media only screen and (min-width: 600px)': {
            width: '26vw',
        },
        '@media (min-width: 1324px)': {
            width: '344.24px',
        },
    }),
    CardName: css({
        position: 'absolute',
        top: '3.5vw',
        left: '4.2vw',
        fontSize: '10.5vw',
        '@media only screen and (min-width: 600px)': {
            top: '0.5vw',
            left: '0.6vw',
            fontSize: '1.5vw',
        },
        '@media (min-width: 1324px)': {
            fontSize: '19.86px',
        },
        color: selected ? theme.color.text : theme.color.primary,
        width: '60%',
        textAlign: 'left',
    }),
    CardNumber: css({
        position: 'absolute',
        top: (selected || cardLoading) && !loading ? '3.5vw' : '60%',
        right: (selected || cardLoading) && !loading ? '4.2vw' : '50%',
        transform: (selected || cardLoading) && !loading ? 'none' : 'translate(50%, -50%)',
        width: loading ? '50%' : 'auto',
        height: loading ? '50%' : 'auto',
        color: PALETTE.white,
        fontSize: (selected || cardLoading) && !loading ? '10.5vw' : '42vw',
        '@media only screen and (min-width: 600px)': {
            top: (selected || cardLoading) && !loading ? '0.5vw' : '60%',
            right: (selected || cardLoading) && !loading ? '0.6vw' : '50%',
            fontSize: selected || cardLoading ? '1.5vw' : '6vw',
        },
        '@media (min-width: 1324px)': {
            fontSize: (selected || cardLoading) && !loading ? '19.86px' : '79.44px',
            top: (selected || cardLoading) && !loading ? '0.5vw' : '60%',
            right: (selected || cardLoading) && !loading ? '0.6vw' : '50%',
        },
        transition: `all ${TRANSITION_TIME.short}ms`,
    }),
    CardTTLogo: css({
        position: 'absolute',
        top: '60%',
        right: '50%',
        fontSize: selected || cardLoading ? '42vw' : '0',
        transform: 'translate(50%, -50%)',
        color: theme.backgroundColor.primary,
        transition: `all ${TRANSITION_TIME.short}ms`,
        ':active': {
            transform: 'translate(50%, -50%) scale(0.9)',
        },
        '@media only screen and (min-width: 600px)': {
            fontSize: selected || cardLoading ? '6vw' : '0',
        },
        '@media (min-width: 1324px)': {
            fontSize: selected || cardLoading ? '79.44px' : '0',
        },
    }),
    CardContainer: css({
        position: 'relative',
        display: 'inline-block',
        margin: '4px',
        padding: '10px',
        backgroundColor: selected ? PALETTE.green : theme.backgroundColor.secondary,
        width: 'clamp(0px, calc((100% - 56px) / 7), 180px)',
        height: 'clamp(0px, calc((100vw - 56px) / 7), 180px)',
        '@media only screen and (max-width: 600px)': {
            width: 'calc(100% - 8px)',
            height: 'calc(100vw - 8px)',
        },
        boxSizing: 'border-box',
        borderRadius: '3px',
        fontSize: '1rem',
        overflow: 'hidden',
        boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.50)',
        transition: `all ${TRANSITION_TIME.short}ms`,
        ':hover': {
            cursor: 'pointer',
            boxShadow: `0px 0px 15px -8px ${PALETTE.green}`,
            '.cardNumber': {
                top: '3.5vw',
                right: '4.2vw',
                fontSize: '10.5vw',
                '@media only screen and (min-width: 600px)': {
                    top: '0.5vw',
                    right: '0.6vw',
                    fontSize: '1.5vw',
                },
                '@media (min-width: 1324px)': {
                    fontSize: '19.86px',
                },
                transform: 'none',
            },
            '.cardTTLogo': {
                fontSize: '42vw',
                '@media only screen and (min-width: 600px)': {
                    fontSize: '6vw',
                },
                '@media (min-width: 1324px)': {
                    fontSize: '79.44px',
                },
            },
        },
    }),
    CalendarContainer: css({
        backgroundColor: theme.backgroundColor.ternary,
        fontSize: '0',
        width: '100%',
        maxWidth: '1324px',
        boxSizing: 'border-box',
    }),
});
