import { css, Theme } from '@emotion/react';
import { PALETTE, TRANSITION_TIME } from '../../resources/Constants';

export const CalendarStyle = (theme: Theme, selected?: boolean) => ({
    CalendarHeaderContainer: css({
        width: '100%',
        height: '10%',
        textAlign: 'center',
        color: 'white',
        fontSize: '2rem',
    }),
    CardName: css({
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontSize: '1.5vw',
        '@media (min-width: 1464px)': {
            fontSize: '21.96px',
        },
        color: PALETTE.white,
    }),
    CardNumber: css({
        position: 'absolute',
        top: selected ? '10px' : '60%',
        right: selected ? '10px' : '50%',
        transform: selected ? 'none' : 'translate(50%, -50%)',
        color: selected ? PALETTE.white : PALETTE.green,
        fontSize: selected ? '1.5vw' : '6vw',
        '@media (min-width: 1464px)': {
            fontSize: selected ? '21.96px' : '87.84px',
        },
        transition: `all ${TRANSITION_TIME.short}ms`,
    }),
    CardTTLogo: css({
        position: 'absolute',
        top: '60%',
        right: '50%',
        fontSize: selected ? '6vw' : '0',
        '@media (min-width: 1464px)': {
            fontSize: selected ? '87.84px' : '0',
        },
        transform: 'translate(50%, -50%)',
        color: theme.backgroundColor.primary,
        transition: `all ${TRANSITION_TIME.short}ms`,
        ':active': {
            transform: 'translate(50%, -50%) scale(0.9)',
        },
    }),
    CardContainer: css({
        position: 'relative',
        display: 'inline-block',
        margin: '4px',
        padding: '10px',
        backgroundColor: selected ? PALETTE.green : theme.backgroundColor.secondary,
        width: 'clamp(0px, calc((100% - 56px) / 7), 200px)',
        height: 'clamp(0px, calc((100vw - 56px) / 7), 200px)',
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
                top: '10px',
                right: '10px',
                fontSize: '1.5vw',
                '@media (min-width: 1464px)': {
                    fontSize: '21.96px',
                },
                transform: 'none',
            },
            '.cardTTLogo': {
                fontSize: '6vw',
                '@media (min-width: 1464px)': {
                    fontSize: '87.84px',
                },
            },
        },
    }),
    CardRow: css({
        display: 'block',
        padding: '0',
        margin: 0,
        width: '100%',
        textAlign: 'center',
    }),
    CalendarContainer: css({
        backgroundColor: theme.backgroundColor.ternary,
        padding: '4px',
        fontSize: '0',
        width: '100%',
        boxSizing: 'border-box',
    }),
});
