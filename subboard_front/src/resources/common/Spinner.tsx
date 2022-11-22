/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { css, SerializedStyles } from '@emotion/react';
import { TRANSITION_TIME } from '../Constants';

export const SpinnerStyle = (color?: string, loading?: boolean) => ({
    spinnerStyle: css({
        color,
        opacity: loading ? '1' : '0',
        transition: loading ? 'none' : `opacity ${TRANSITION_TIME.veryLong}ms ease-in`,
    }),
});

interface Props {
    loading?: boolean;
    success?: boolean;
    color?: string;
    cssStyle?: SerializedStyles;
}

export default function Spinner({ loading, success, color, cssStyle } : Props) {
    const style = SpinnerStyle(color, loading);

    return (
        <div css={[style.spinnerStyle, cssStyle]}>
            {loading && <FontAwesomeIcon icon={faCircleNotch} spin />}
            {!loading && success && <FontAwesomeIcon icon={faCircleCheck} />}
        </div>
    );
}
