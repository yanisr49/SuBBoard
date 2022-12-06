import { css, Theme } from '@emotion/react';

export const SubStyle = (theme: Theme, expended: boolean) => ({
    CardContainer: css(expended ? {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor.ternary,
        zIndex: '1',

        // HEADER
        '.cardHeader': {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '135px',

            // Logo
            '.cardImage': {
                position: 'relative',
                width: '135px',
                height: '100%',
                overflow: 'hidden',
                img: {
                    height: '100%',
                    position: 'absolute',
                    top: '-9999px',
                    bottom: '-9999px',
                    left: '-9999px',
                    right: '-9999px',
                    margin: 'auto',
                },
                '.penToSquare': {
                    display: 'none',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    transform: 'translate(50%, 50%)',
                    width: 'calc(135px / 2)',
                    height: 'calc(135px / 2)',
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
                width: 'calc(100% - 100px - 67.5px - 135px)',
                height: '100%',
                padding: '0 0 0 10px',
                fontSize: '4em',
                boxSizing: 'border-box',
            },

            '.headerRightOptions': {
                display: 'flex',
                flexDirection: 'column',
            },

            // Spinner
            '.spinner': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '67.5px',
                height: '67.5px',
                fontSize: '1.5em',
            },

            // Color picker
            '.buttonColorPicker': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '67.5px',
                height: '67.5px',
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
                top: '145px',
                right: '30px',
                '.panel-body': {
                    backgroundColor: 'transparent',
                },
            },
            '.logoPicker': {
                position: 'absolute',
                top: '145px',
                left: '10px',
                input: {
                    backgroundColor: theme.backgroundColor.secondary,
                    border: `1px solid ${theme.backgroundColor.primary}`,
                    fontSize: '1.5em',
                    borderRadius: '5px',
                    color: theme.color.text,
                    padding: '10px',
                    marginRight: '10px',
                    outlineWidth: '0',
                    width: '200%',
                },
                '.panel-body': {
                    backgroundColor: 'transparent',
                },
            },
            '.close': {
                display: 'none',
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

            // Logo
            '.cardImage': {
                display: 'inline-block',
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
                '&:hover': {
                    cursor: 'pointer',
                },
            },

            // Color picker
            '.colorPicker, .buttonColorPicker, .logoPicker, .close': {
                display: 'none',
            },
        },
    }),
});
