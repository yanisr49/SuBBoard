/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import React, {
    CSSProperties, useCallback, useRef, useState, useEffect, useLayoutEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { current } from '@reduxjs/toolkit';
import { createNoSubstitutionTemplateLiteral, ListFormat } from 'typescript';
import { debounce, throttle } from 'lodash';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Chip from '../../chip/Chip';
import image from '../../../resources/img/netflix_logo.png';
import SubscriptionModel from '../../../models/SubscriptionModel';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import Input from '../../../resources/common/input/Input';
import { Query, Subscription } from '../../../graphql/generated/graphql';
import { createSubscription, editSubscription } from '../../../graphql/mutations';
import ROUTES_PATHS from '../../../router/RoutesPath';
import themes from '../../../theme';
import { NewSubStyle } from './NewSubStyle';
import { QUERY_NAMES } from '../../../resources/Constants';
import Spinner from '../../../resources/common/Spinner';

interface Props {
  loading: boolean;
}

function NewSub({ loading }: Props) {
    // const navigate = useNavigate();
    const theme = useAppSelector(selectTheme).value;
    const ref = useRef<HTMLDivElement>(null);

    const [position, setPosition] = React.useState<{
        top?: number;
        left?: number;
    }>();

    const style = NewSubStyle(theme, loading, position);

    const queryClient = useQueryClient();
    const createSubscriptionMutation = useMutation(createSubscription, {
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_NAMES.fetchSubscription], (oldData: Pick<Query, 'subscriptions'> | undefined) => {
                const newSubscriptions = {
                    subscriptions: [{
                        id: data.createSubscription?.id ?? '',
                        initDate: new Date(),
                        userEmail: 'yanisrichard21@gmail.com',
                    }],
                } as Pick<Query, 'subscriptions'>;
                if (oldData?.subscriptions?.length && newSubscriptions.subscriptions) {
                    newSubscriptions.subscriptions.push(...oldData.subscriptions);
                }
                return newSubscriptions;
            });
        },

    });

    const handleCreateSub = () => {
        createSubscriptionMutation.mutate();
    };

    const test = (lastChangeTimestamp: number, oldTop?: number, oldLeft?: number) => {
        if (lastChangeTimestamp > Date.now() - 500) {
            const tds = document.getElementsByTagName('td');

            let top = 0;
            let left = 0;
            if (tds.length > 0) {
                top = tds[0].getBoundingClientRect().top + 10;
                left = tds[0].getBoundingClientRect().left + 10;
            }

            setPosition({
                top,
                left,
            });

            const hasChanged = oldTop !== top || oldLeft !== left;
            setTimeout(() => {
                test(hasChanged ? Date.now() : lastChangeTimestamp, top, left);
            }, 10);
        }
    };

    useEffect(() => {
        if (!loading) {
            console.log('tets');
            test(Date.now());
        }

        const ressizeHandler = () => test(Date.now());

        window.addEventListener('resize', ressizeHandler);
        return () => {
            window.removeEventListener('resize', ressizeHandler);
        };
    }, [loading]);

    useLayoutEffect(() => {
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            css={style.NewSubContainer}
            ref={ref}
            className="subscription"
            onClick={handleCreateSub}
            onKeyDown={(ev) => ev.key === 'Enter' && handleCreateSub()}
            role="button"
            tabIndex={0}
        >
            {createSubscriptionMutation.isLoading ? <Spinner css={style.NewSub} loading={createSubscriptionMutation.isLoading} /> : (
                <div
                    css={style.NewSub}
                >
                    +
                </div>
            )}
        </div>
    );
}
const NewSubComponent = React.memo(NewSub);
export default NewSubComponent;
