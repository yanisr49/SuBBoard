/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { css, SerializedStyles } from '@emotion/react';
import { TRANSITION_TIME } from '../Constants';

export const SpinnerStyle = (color?: string, success?: boolean) => ({
    spinnerStyle: css({
        color,
        opacity: success ? '0' : '1',
        transition: success ? `opacity ${TRANSITION_TIME.long}ms ease-in` : 'none',
    }),
});

interface Props {
    loading?: boolean;
    success?: boolean;
    color?: string;
    cssStyle?: SerializedStyles;
}

export default function Spinner({ loading, success, color, cssStyle } : Props) {
    const style = SpinnerStyle(color, !loading && success);

    return (
        <div css={[style.spinnerStyle, cssStyle]}>
            {' '}
            {loading && <FontAwesomeIcon icon={faCircleNotch} spin />}
            {!loading && success && <FontAwesomeIcon icon={faCircleCheck} />}
        </div>
    );
}
