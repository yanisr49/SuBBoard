/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import React, {
    CSSProperties, useCallback, useRef, useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import Chip from '../../chip/Chip';
import image from '../../../resources/img/netflix_logo.png';
import SubscriptionModel from '../../../models/SubscriptionModel';
import { SubStyle } from './SubStyle';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import Input from '../../../resources/common/input/Input';
import SubHeader from './SubHeader';
import { Subscription } from '../../../graphql/generated/graphql';
import { editSubscription } from '../../../graphql/mutations';
import ROUTES_PATHS from '../../../router/RoutesPath';
import themes from '../../../theme';

interface Props {
  subscription: Subscription;
  expended: boolean;
}

function Sub({ subscription, expended }: Props) {
    // const navigate = useNavigate();
    const theme = useAppSelector(selectTheme).value;
    const style = SubStyle(themes.dark, expended);

    return (
        <div
            css={style.CardContainer}
        >
            <SubHeader
                subscription={subscription}
                expended={expended}
            />
        </div>
    );
}
const SubComponent = React.memo(Sub);
export default SubComponent;
