/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Card from '../card/Card';
import SubscriptionModel from '../../models/SubscriptionModel';
import { SubscriptionStyle } from './SubscriptionStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import { QUERY_NAMES } from '../../resources/Constants';
import { fetchSubscriptionsQuery } from '../../graphql/queries';
import { Maybe, Subscription } from '../../graphql/generated/graphql';

export default function Subscriptions() {
    const location = useLocation();
    const theme = useAppSelector(selectTheme).value;
    const style = SubscriptionStyle(theme);

    const subscriptions = useQuery([QUERY_NAMES.fetchSubscription], () => fetchSubscriptionsQuery());
    console.log('subscriptions', subscriptions);
    console.log(location.pathname.split('/')[2]);
    const [displayCards] = React.useState<SubscriptionModel[]>([]);

    const [expended, setExpended] = React.useState<boolean>(false);

    return (
        <div css={style.SubscriptionContainer}>
            <Card
                key="blablabla"
                expended={expended}
                onClick={() => setExpended(!expended)}
            />
            {subscriptions.data?.subscriptions?.map((subscription?: Maybe<Subscription>) => (
                <Card key={`Card-${subscription?.name}`} expended={false} />
            ))}
        </div>
    );
}
