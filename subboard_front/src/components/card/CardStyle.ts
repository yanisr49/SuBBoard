import { css, Theme } from '@emotion/react';
import { NONAME } from 'dns';

export const CardStyle = (theme: Theme, expended: boolean) => ({
    CardContainer: css(expended ? {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'pink',
        zIndex: '1000',

        // HEADER
        '.cardHeader': {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100px',
            backgroundColor: 'lime',

            // Logo
            '.cardImage': {
                display: 'inline-block',
                position: 'relative',
                height: '100%',
                backgroundColor: 'white',
                img: {
                    height: '100%',
                },
                '.penToSquare': {
                    display: 'none',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    height: '50%',
                    color: theme.backgroundColor.ternary,
                    '&:hover': {
                        display: 'block',
                        cursor: 'pointer',
                    },
                },
                '&:hover': {
                    img: {
                        opacity: '0.6',
                    },
                    '.penToSquare': {
                        display: 'block',
                    },
                    cursor: 'pointer',
                },
            },

            // Nom de l'abonnement
            '.cardName': {
                outlineWidth: '0',
                border: 'none',
                color: 'black',
                backgroundColor: 'blue',
                width: 'calc(100% - 100px - 50px)',
                height: '100%',
                padding: '0 0 0 10px',
                fontSize: '4em',
                boxSizing: 'border-box',
            },
        },
    } : {
        width: '200px',
        height: '300px',
        backgroundColor: 'red',
        border: '2px solid green',
        overflow: 'hidden',

        // HEADER
        '.cardHeader': {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '50px',
            backgroundColor: 'lime',

            // Logo
            '.cardImage': {
                display: 'inline-block',
                position: 'relative',
                height: '100%',
                backgroundColor: 'white',
                img: {
                    height: '100%',
                },
                '.penToSquare': {
                    display: 'none',
                },
            },

            // Nom de l'abonnement
            '.cardName': {
                outlineWidth: '0',
                border: 'none',
                color: 'black',
                backgroundColor: 'blue',
                width: '150px',
                height: '100%',
                padding: '0 0 0 10px',
                fontSize: '2em',
                boxSizing: 'border-box',
            },
        },

    }),
    test: css({
        display: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
    }),
});
