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
import Chip from '../chip/Chip';
import image from '../../resources/img/netflix_logo.png';
import SubscriptionModel from '../../models/SubscriptionModel';
import { CardStyle } from './CardStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import Input from '../../resources/common/input/Input';
import CardHeader from './CardHeader';

interface Props {
  subscription?: SubscriptionModel;
  expended: boolean;
  onClick?: () => void;
}

export default function Card({ subscription, expended, onClick }: Props) {
    const navigate = useNavigate();
    const theme = useAppSelector(selectTheme).value;
    const style = CardStyle(theme, expended);

    const cardRef = useRef<HTMLDivElement>(null);

    const handleOnBlur = (value: string) => {
        console.log(value);
    };

    // console.log(cardRef);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            onClick={expended ? undefined : onClick}
            ref={cardRef}
            css={style.CardContainer}
        >
            <CardHeader expended={expended} />
        </div>
    );
}
