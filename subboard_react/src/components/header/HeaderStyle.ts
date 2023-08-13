import { css, Theme } from '@emotion/react';

export const HeaderStyle = (theme: Theme) => ({
    header: css({
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: theme.backgroundColor.secondary,
        width: '100%',
        height: '6%',
        boxShadow: '0px 0px 3px 0px rgb(0,0,0)',
        display: 'flex',
        img: {
            height: '100%',
        },
    }),
});
