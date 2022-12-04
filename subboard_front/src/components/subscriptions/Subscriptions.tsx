/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Sub from './subscription/Sub';
import SubscriptionModel from '../../models/SubscriptionModel';
import { SubscriptionStyle } from './SubscriptionsStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import { QUERY_NAMES } from '../../resources/Constants';
import { fetchSubscriptionsQuery } from '../../graphql/queries';
import { Maybe, Subscription } from '../../graphql/generated/graphql';
import Input from '../../resources/common/input/Input';
import useExpendedCard from './useExpendedCard';
import ROUTES_PATHS from '../../router/RoutesPath';

export default function Subscriptions() {
    const navigate = useNavigate();
    const [expendedCard, updateSubscriptions] = useExpendedCard();
    const theme = useAppSelector(selectTheme).value;
    const style = SubscriptionStyle(theme);

    const subscriptions = useQuery([QUERY_NAMES.fetchSubscription], () => fetchSubscriptionsQuery(), {
        onSuccess: (data) => updateSubscriptions(data.subscriptions),
    });

    return (
        <div css={style.SubscriptionContainer}>
            {subscriptions.data?.subscriptions?.map((subscription?: Maybe<Subscription>) => subscription && (
                <Sub
                    key={`Card-${subscription?.id}`}
                    subscription={subscription}
                    expended={expendedCard?.id === subscription?.id}
                    onClick={() => navigate(`${ROUTES_PATHS.subscriptions}/${(subscription.name ?? subscription.id).replaceAll(' ', '_')}`)}
                />
            ))}
        </div>
    );
}
