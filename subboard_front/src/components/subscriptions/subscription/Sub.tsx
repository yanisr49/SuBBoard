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

interface Props {
  subscription: Subscription;
  expended: boolean;
  onClick?: () => void;
}

export default function Sub({ subscription, expended, onClick }: Props) {
    const theme = useAppSelector(selectTheme).value;
    const [subName, setSubname] = useState<string>(subscription.name ?? '');
    const [subColor, setSubcolor] = useState<string>(subscription.color ?? 'red');
    const style = SubStyle(theme, expended, subColor);

    const editSubNameMutation = useMutation(editSubscription, {
        mutationKey: 'name',
        onMutate: async (data) => {
            const previousData = {
                ...subscription,
            };
            previousData.name = subName;
            const newData = {
                ...subscription,
            };
            newData.name = data.name ?? '';
            setSubname(newData.name);
            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            setSubname(context?.previousData.name ?? '');
        },
    });

    const handleChangeName = (value: string) => {
        editSubNameMutation.mutate({
            id: subscription.id,
            name: value,
        });
    };

    const editSubColorMutation = useMutation(editSubscription, {
        mutationKey: 'color',
        onMutate: async (data) => {
            const previousData = {
                ...subscription,
            };
            previousData.color = subColor;
            const newData = {
                ...subscription,
            };
            newData.color = data.color ?? '';
            setSubcolor(newData.color);
            return {
                previousData, newData,
            };
        },
        onError: (err, newData, context) => {
            setSubcolor(context?.previousData.name ?? '');
        },
    });

    const handleChangeColor = (value: string) => {
        editSubColorMutation.mutate({
            id: subscription.id,
            color: value,
        });
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            onClick={expended ? undefined : onClick}
            css={style.CardContainer}
        >
            <SubHeader
                name={subName}
                handleChangeName={handleChangeName}
                color={subColor}
                handleChangeColor={handleChangeColor}
                expended={expended}
            />
        </div>
    );
}
