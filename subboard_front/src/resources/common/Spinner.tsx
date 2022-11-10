/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme } from '../../redux/store';
import themes from '../../theme';
import { TRANSITION_TIME } from '../Constants';

export const SpinnerStyle = (color?: string, success?: boolean) => ({
    spinnerStyle: css({
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color,
        opacity: success ? '0' : '1',
        transition: success ? `opacity ${TRANSITION_TIME.long}ms ease-in` : 'none',
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
