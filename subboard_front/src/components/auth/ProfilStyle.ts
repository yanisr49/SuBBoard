import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

export const ProfilStyle = (theme: Theme, expended: boolean, loggedIn: boolean, expendedDelayed: boolean) => ({
    ProfilBlurContainer: css({
        position: 'fixed',
        top: '0',
        right: '0',
        width: expended || expendedDelayed ? '100%' : '0',
        height: expended || expendedDelayed ? '100%' : '0',
        backdropFilter: expended ? 'blur(10px)' : 'none',
        backgroundColor: expended ? 'rgb(0, 0, 0, 0.2)' : 'transparent',
        overflow: 'hidden',
        transition: `
            backdrop-filter ${TRANSITION_TIME.short}ms,
            background-color ${TRANSITION_TIME.short}ms
        `,
        zIndex: 9,
    }),
    ProfilContainer: css({
        backgroundColor: theme.backgroundColor.ternary,
        position: 'fixed',
        right: expended ? '50%' : '30px',
        bottom: expended ? '50%' : '30px',
        maxWidth: expended ? '100%' : '75px',
        maxHeight: expended ? '100%' : '75px',
        padding: expended ? '10px' : '0',
        overflow: (expended && expendedDelayed) || !loggedIn ? 'visible' : 'hidden',
        borderRadius: expended ? '5px' : '37.5px',
        boxShadow: '0px 0px 7px -2px rgba(0,0,0)',
        transform: expended ? 'translate(50%, 50%)' : 'none',
        transition: `all ${TRANSITION_TIME.short}ms ease-in`,
        zIndex: 10,
        '@media only screen and (min-width: 600px)': {
            top: expended ? '50%' : '30px',
            right: expended ? '50%' : '30px',
            bottom: 'auto',
            transform: expended ? 'translate(50%, -50%)' : 'none',
        },
        '&:hover': {
            cursor: expended && expendedDelayed ? 'auto' : 'pointer',
        },
    }),
    PPContainer: css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.color.text,
        p: {
            margin: '0 20px',
        },
    }),
    ProfilPicture: css({
        display: 'block',
        width: '75px',
        height: '75px',
        borderRadius: '37.5px',
    }),
    Preferences: css({
        textAlign: 'center',
    }),
    Select: css({
        margin: '10px',
    }),
    logoutButton: css({
        backgroundColor: theme.color.error,
        color: theme.backgroundColor.ternary,
        minWidth: '50%',
        marginTop: '10px',
        padding: '10px',
        fontSize: '15px',
        border: 'none',
        borderRadius: '5px',
        ':hover': {
            cursor: 'pointer',
        },
    }),
    signInButton: css({
        position: 'absolute',
        top: '-40px',
        right: '0',
    }),
});
