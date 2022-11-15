import { css, Theme } from '@emotion/react';

export const CalendarStyle = (theme: Theme, nbRow: number) => ({
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
            width: '60vh',
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
