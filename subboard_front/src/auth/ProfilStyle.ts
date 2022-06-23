import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../resources/Constants';

export const ProfilStyle = (theme: Theme, clicked: boolean) => ({
    ProfilContainer: css`
        background-color: ${theme.color.primary};
        position: absolute;
        top: ${clicked ? '50%' : '10px'};
        right: ${clicked ? '50%' : '10px'};
        transition: ${TRANSITION_TIME}ms;
        transform: ${clicked ? 'translate(50%, -50%)' : ''};
    `,
    ProfilPicture: css`
        width: ${clicked ? '200px' : '50px'};
        height: ${clicked ? '200px' : '50px'};
        max-width: none !important;
        border-radius: 50%;
        transition: ${TRANSITION_TIME}ms;
    `,
});
