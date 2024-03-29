import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

export const ProfilStyle = (theme: Theme, expended: boolean, loggedIn: boolean, expendedDelayed: boolean, loggining: boolean) => ({
    ProfilBlurContainer: css({
        position: 'fixed',
        top: '-100%',
        right: '-100%',
        width: loggining || expended || expendedDelayed ? '300%' : '0',
        height: loggining || expended || expendedDelayed ? '300%' : '0',
        backdropFilter: loggining || expended ? 'blur(30px)' : 'none',
        backgroundColor: loggining || expended ? 'rgb(0, 0, 0, 0.7)' : 'transparent',
        overflow: 'hidden',
        transition: `
            backdrop-filter ${TRANSITION_TIME.medium}ms,
            background-color ${TRANSITION_TIME.medium}ms
        `,
        zIndex: expended ? 2 : -1,
    }),
    ProfilContainer: css({
        backgroundColor: theme.backgroundColor.ternary,
        position: 'fixed',
        right: expended ? '50%' : '30px',
        bottom: expended ? '50%' : '30px',
        width: 'auto',
        height: 'auto',
        maxWidth: expended ? '100%' : '75px',
        maxHeight: expended ? '100%' : '75px',
        padding: expended ? '10px' : '0',
        overflow: ((expended && expendedDelayed) || !loggedIn) && !loggining ? 'visible' : 'hidden',
        borderRadius: expended ? '5px' : '37.5px',
        boxShadow: '0px 0px 7px -2px rgba(0,0,0)',
        transform: expended ? 'translate(50%, 50%)' : 'none',
        transition: `all ${TRANSITION_TIME.medium}ms`,
        zIndex: 3,
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
    signInButton: css({
        position: 'absolute',
        top: '-40px',
        right: '0',
        borderRadius: '20px',
        boxShadow: '0px 0px 7px -2px rgba(0,0,0)',
        '@media only screen and (min-width: 600px)': {
            top: '0',
        },
    }),
});
