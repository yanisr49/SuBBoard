/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';

export const WelcomePageStyle = (theme: Theme) => ({
    WelcomePage: css({
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%',
        '.welcomeButton': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '99vw',
            height: '49vh',
            margin: '1vw',
            fontSize: '8vw',
            fontWeight: 'bold',
            color: theme.color.primary,
            border: `5px solid ${theme.color.primary}`,
            borderRadius: '3px',
            boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.50)',
            boxSizing: 'border-box',
            ':hover': {
                cursor: 'pointer',
                boxShadow: `0px 0px 5px 0px ${theme.color.primary}`,
            },
            ':active': {
                transform: 'scale(0.99)',
            },

            '@media only screen and (min-width: 600px)': {
                flexDirection: 'row',
                width: '294px',
                margin: '6px',
                fontSize: '24px',
            },
        },
    }),
});
