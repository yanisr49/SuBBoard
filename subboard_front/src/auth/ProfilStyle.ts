import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../resources/Constants';

export const ProfilStyle = (theme: Theme, clicked: boolean) => ({
    ProfilContainer: css`
        background-color: ${theme.backgroundColor.primary};
        border-radius: ${clicked ? '6px' : '25px'};
        position: absolute;
        width: ${clicked ? '200px' : '50px'};
        height: ${clicked ? '200px' : '50px'};
        top: ${clicked ? '50%' : '10px'};
        right: ${clicked ? '50%' : '10px'};
        transition: ${TRANSITION_TIME}ms;
        transform: ${clicked ? 'translate(50%, -50%)' : ''};
    `,
    ProfilPicture: css`
        width: ${clicked ? '200px' : '50px'};
        height: ${clicked ? '200px' : '50px'};
        max-width: none !important;
        border-radius: ${clicked ? '100px' : '25px'};
        transition: ${TRANSITION_TIME}ms;
    `,
    Test: css`
        max-width: ${clicked ? '200px' : '10px'};
        height: ${clicked ? '200px' : '0px'};
        transition: ${TRANSITION_TIME}ms;
        overflow: hidden;
    `,
});
