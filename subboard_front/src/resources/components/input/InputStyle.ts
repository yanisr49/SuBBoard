import { css, Theme } from '@emotion/react';

export const InputStyle = (theme: Theme) => ({
    InputContainer: css({
        display: 'inline-block',
        label: {
            color: theme.color.primary,
            fontSize: '1.5em',
        },
        input: {
            display: 'block',
            backgroundColor: theme.backgroundColor.secondary,
            border: `1px solid ${theme.backgroundColor.primary}`,
            fontSize: '1.5em',
            borderRadius: '5px',
            color: theme.color.text,
            padding: '10px',
            '&:focus': {
                outlineWidth: '0',
            },
        },
    }),
});
