import { css, Theme } from '@emotion/react';

export const AppStyle = (theme: Theme) => ({
    main: css({
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.backgroundColor.ternary,
    }),
});
