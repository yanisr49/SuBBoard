import { css, Theme } from '@emotion/react';
import { TRANSITION_TIME } from '../../resources/Constants';

export const CalendarStyle = (theme: Theme, selected?: boolean) => ({
    CalendarContainer: css`
        background-color: ${theme.backgroundColor.ternary};
        width: clamp(700px, 80%, 1000px);
        height: 100%;
        min-height: 600px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 4px;
    `,
    CalendarHeaderContainer: css`
        width: 100%;
        height: 10%;
        text-align: center;
        font-family: Nunito-Variable;
        color: white;
        font-size: 2em;
    `,
    CardContainer: css`
        background-color: ${selected ? 'lime' : theme.backgroundColor.secondary};
        width: calc(100% / 7 - 8px);
        height: calc(90% / 6 - 8px);
        box-sizing: border-box;
        border-radius: 3px;
        &:hover {
            cursor: pointer;
            transform: scale(1.01);
        }
    `,
});
