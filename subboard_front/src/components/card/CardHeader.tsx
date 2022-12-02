/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import React, {
    CSSProperties, useCallback, useRef,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SketchPicker } from 'react-color';
import Chip from '../chip/Chip';
import image from '../../resources/img/netflix_logo.png';
import SubscriptionModel from '../../models/SubscriptionModel';
import { CardStyle } from './CardStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import Input from '../../resources/common/input/Input';

interface Props {
    expended: boolean;
}

export default function CardHeader({ expended }: Props) {
    const navigate = useNavigate();
    const theme = useAppSelector(selectTheme).value;

    const style = CardStyle(theme, expended);

    return (
        <div className="cardHeader">
            <div className="cardImage">
                {/* eslint-disable-next-line max-len */}
                <img src="https://cdn.vox-cdn.com/thumbor/SEEvZdiXcs0CS-YbPj2gm6AJ8qc=/0x0:3151x2048/1400x1400/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png" alt="logo Netflix" />
                <FontAwesomeIcon icon={faPenToSquare} className="penToSquare" />
            </div>
            <input className="cardName" defaultValue="Netflix" disabled={!expended} />
            <SketchPicker css={style.test} />
        </div>
    );
}
