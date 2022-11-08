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
    CardName: css`
        position: absolute;
        top: 10px;
        left: 10px;
        color: ${theme.color.text};
    `,
    CardNumber: css`
        position: absolute;
        top: 60%;
        right: 50%;
        transform: translate(50%, -50%);
        color: ${theme.color.primary};
        font-size: 3vw;
        transition: all ${TRANSITION_TIME}ms;
    `,
    CardContainer: css`
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: ${selected ? 'lime' : theme.backgroundColor.secondary};
        width: calc(100% / 7 - 8px);
        height: calc(90% / 6 - 8px);
        box-sizing: border-box;
        border-radius: 3px;
        padding: 10px;
        -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.50);
        box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.50);
        transition: all ${TRANSITION_TIME}ms;
        &:hover {
            cursor: pointer;
            transform: scale(1.02);
            span+span {
                top: 10px;
                right: 10px;
                font-size: 1em;
            }
        }
    `,
});
