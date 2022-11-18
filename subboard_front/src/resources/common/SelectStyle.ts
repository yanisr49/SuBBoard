import { css, Theme } from '@emotion/react';

export const SelectStyle = (theme: Theme, open: boolean) => ({
    Select: css({
        color: theme.color.primary,
        fontSize: '0.9em',
        textAlign: 'left',
        '& p': {
            margin: '0',
        },

        '& button': {
            backgroundColor: theme.backgroundColor.secondary,
            border: `1px solid ${theme.backgroundColor.primary}`,
            fontSize: '1.5em',
            borderRadius: '5px',
            color: theme.color.text,
            padding: '10px',
            '& svg': {
                marginLeft: '30px',
                transform: open ? 'rotate(180deg)' : 'none',
            },
            '&:hover': {
                cursor: 'pointer',
            },
        },
        '& div': {
            backgroundColor: theme.backgroundColor.secondary,
            border: `1px solid ${theme.backgroundColor.primary}`,
            visibility: open ? 'visible' : 'hidden',
            position: 'absolute',
            marginTop: '10px',
            borderRadius: '5px',
            overflow: 'hidden',
            '& a': {
                display: 'block',
                color: theme.color.text,
                fontSize: '1.5em',
                padding: '10px 50px 10px 20px',
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: theme.color.primary,
                },
            },
        },
    }),
});
