import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

export const ProfilStyle = (theme: Theme, loggedIn: boolean, expended: boolean) => ({
    ProfilContainer: css({
        backgroundColor: theme.backgroundColor.ternary,
        position: 'fixed',
        right: expended ? '50%' : '30px',
        bottom: expended ? '50%' : '30px',
        width: expended ? 'auto' : '75px',
        padding: expended ? '10px' : '0',
        overflow: 'hidden',
        borderRadius: expended ? '5px' : '37.5px',
        boxShadow: '0px 0px 7px -2px rgba(0,0,0)',
        transform: expended ? 'translate(50%, 50%)' : 'none',
        transition: `${TRANSITION_TIME.medium}ms`,
        zIndex: 10,
        '@media only screen and (min-width: 600px)': {
            top: expended ? '50%' : '30px',
            right: expended ? '50%' : '30px',
            bottom: 'auto',
            transform: expended ? 'translate(50%, -50%)' : 'none',
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
        width: expended ? 'auto' : '0px',
        height: expended ? 'auto' : '0px',
        textAlign: 'center',
        overflow: 'hidden',
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
        width: loggedIn ? '0' : 'auto',
        height: loggedIn ? '0' : 'auto',
        position: 'absolute',
        top: '10px',
        right: '10px',
        borderRadius: '20px',
        overflow: 'hidden',
    }),
});
