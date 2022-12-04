import { css, Theme } from '@emotion/react';

export const SubStyle = (theme: Theme, expended: boolean, headerColor: string) => ({
    CardContainer: css(expended ? {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor.ternary,
        zIndex: '1000',

        // HEADER
        '.cardHeader': {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100px',
            backgroundColor: headerColor,

            // Logo
            '.cardImage': {
                display: 'inline-block',
                position: 'relative',
                height: '100%',
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
                backgroundColor: 'inherit',
                width: 'calc(100% - 100px - 50px)',
                height: '100%',
                padding: '0 0 0 10px',
                fontSize: '4em',
                boxSizing: 'border-box',
            },

            // Color picker
            '.buttonColorPicker': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
                height: '50px',
                fontSize: '1.5em',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                    color: theme.backgroundColor.secondary,
                },
                '&:active': {
                    color: theme.backgroundColor.primary,
                },
            },
            '.colorPicker': {
                position: 'absolute',
                top: '110px',
                right: '10px',
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
            backgroundColor: headerColor,

            // Logo
            '.cardImage': {
                display: 'inline-block',
                position: 'relative',
                height: '100%',
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
                backgroundColor: 'inherit',
                width: '150px',
                height: '100%',
                padding: '0 0 0 10px',
                fontSize: '2em',
                boxSizing: 'border-box',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },

            // Color picker
            '.colorPicker, .buttonColorPicker': {
                display: 'none',
            },
        },

    }),
});
