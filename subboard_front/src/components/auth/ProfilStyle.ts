import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

export const ProfilStyle = (theme: Theme, expended: boolean) => ({
    ProfilBlurContainer: css({
        position: 'fixed',
        right: expended ? '0' : '30px',
        bottom: expended ? '0' : '30px',
        width: expended ? '100%' : '75px',
        height: expended ? '100%' : '75px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        borderRadius: expended ? '5px' : '37.5px',
        transition: `${TRANSITION_TIME.medium}ms`,
        overflow: 'hidden',
        zIndex: 9,
        '@media only screen and (min-width: 600px)': {
            top: expended ? '0' : '30px',
            right: expended ? '0' : '30px',
            bottom: 'auto',
        },
        '&:hover': {
            cursor: expended ? 'auto' : 'pointer',
        },
    }),
    ProfilContainer: css({
        position: 'absolute',
        top: expended ? '50%' : '0',
        left: expended ? '50%' : '0',
        transform: expended ? 'translate(-50%, -50%)' : 'none',
        backgroundColor: theme.backgroundColor.ternary,
        padding: expended ? '10px' : '0',
        width: 'min-content',
        borderRadius: expended ? '5px' : '37.5px',
        boxShadow: '0px 0px 7px -2px rgba(0,0,0)',
        transition: `${TRANSITION_TIME.medium}ms`,
        zIndex: 10,
        '&:hover': {
            cursor: expended ? 'auto' : 'pointer',
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
        top: '0',
        right: '0',
    }),
});
