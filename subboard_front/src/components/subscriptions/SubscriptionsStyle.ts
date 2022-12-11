import { css, Theme } from '@emotion/react';

export const SubscriptionStyle = (theme: Theme) => ({
    SubscriptionContainer: css({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        transition: 'all 0.2s',
        border: 'none',

        '.subscriptionsHeader': {
            height: '10vh',
        },

        table: {
            width: '100%',
            maxWidth: '1800px',

            tr: {
                borderCollapse: 'collapse',
                height: 'calc((min(1800px, 100vw) / 5) * 1.4)',
                td: {
                    width: 'calc(min(1800px, 100%) / 5)',
                },
            },
        },
    }),
});
