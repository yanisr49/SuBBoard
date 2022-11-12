/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';
import { TRANSITION_TIME } from '../Constants';

export const SpinnerStyle = (color?: string, success?: boolean) => ({
    spinnerStyle: css({
        position: 'absolute',
        bottom: '3.5vw',
        right: '4.2vw',
        fontSize: '7vw',
        color,
        opacity: success ? '0' : '1',
        transition: success ? `opacity ${TRANSITION_TIME.long}ms ease-in` : 'none',
        '@media only screen and (min-width: 600px)': {
            bottom: '0.5vw',
            right: '0.6vw',
            fontSize: '1vw',
        },
        '@media only screen and (min-width: 1324px)': {
            bottom: '6.62px',
            right: '7.94px',
            fontSize: '13.24px',
        },
    }),
});

interface Props {
    loading?: boolean;
    success?: boolean;
    color?: string;
}

export default function Spinner({ loading, success, color } : Props) {
    const style = SpinnerStyle(color, !loading && success);

    return (
        <div css={style.spinnerStyle}>
            {loading && <FontAwesomeIcon icon={faCircleNotch} spin />}
            {!loading && success && <FontAwesomeIcon icon={faCircleCheck} />}
        </div>
    );
}
