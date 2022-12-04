import { css, Theme } from '@emotion/react';

export const SubscriptionStyle = (theme: Theme) => ({
    SubscriptionContainer: css({
        backgroundColor: 'navy',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        transition: 'all 0.2s',
        transitionDelay: '0.07s',
        overflowX: 'hidden',
        overflowY: 'auto',
    }),
});
