import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../../resources/Constants';

export const NewSubStyle = (
    theme: Theme,
    position?: {
        top?: number;
        left?: number;
    },
) => ({
    NewSubContainer: css({
        position: position ? 'absolute' : 'inherit',
        top: position ? `${position.top}px` : 'inherit',
        left: position ? `${position.left}px` : 'inherit',
        width: 'calc(min(1800px, 100%) / 5 - 20px)',
        height: 'calc((min(1800px, 100vw) / 5) * 1.4 - 20px)',
        zIndex: '1',
        transition: `all ${TRANSITION_TIME.short}ms ease-in`,
    }),
    NewSub: css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor.secondary,
        borderRadius: '7px',
        overflow: 'hidden',
        color: theme.backgroundColor.light2,
        fontSize: '10em',
        border: `8px solid ${theme.backgroundColor.light2}`,
        boxSizing: 'border-box',
        boxShadow: '0px 0px 4px 0px rgba(0,0,0)',
        transition: `all ${TRANSITION_TIME.veryShort}ms ease-in`,
        zIndex: '1',
        ':hover': {
            zIndex: '2',
            cursor: 'pointer',
            color: theme.backgroundColor.light,
            border: `8px solid ${theme.backgroundColor.light}`,
        },
        '&:active': {
            transform: 'scale(0.98)',
        },
    }),
});
