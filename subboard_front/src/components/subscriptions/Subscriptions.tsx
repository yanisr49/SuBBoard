/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Sub from './subscription/Sub';
import { SubscriptionStyle } from './SubscriptionsStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import { QUERY_NAMES } from '../../resources/Constants';
import { fetchSubscriptionsQuery } from '../../graphql/queries';
import { Maybe, Subscription } from '../../graphql/generated/graphql';
import Input from '../../resources/common/input/Input';
import useExpendedCard from './hooks/useExpendedCard';
import ROUTES_PATHS from '../../router/RoutesPath';

export default function Subscriptions() {
    const [expendedCard, updateSubscriptions] = useExpendedCard();
    const theme = useAppSelector(selectTheme).value;
    const style = SubscriptionStyle(theme);

    const subscriptions = useQuery([QUERY_NAMES.fetchSubscription], () => fetchSubscriptionsQuery(), {
        onSuccess: (data) => updateSubscriptions(data.subscriptions),
    });

    return (
        <div css={style.SubscriptionContainer}>
            {/* <Input id="treygecv" name="kjsdkjvbn" onBlur={() => {}} /> */}
            {subscriptions.data?.subscriptions?.map((subscription?: Maybe<Subscription>) => {
                if (subscription && expendedCard?.id !== subscription?.id) {
                    return (
                        <Link
                            to={`${ROUTES_PATHS.subscriptions}/${(subscription.name ?? subscription.id).replaceAll(' ', '_')}`}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <Sub
                                key={`Card-${subscription?.id}`}
                                subscription={subscription}
                                expended={expendedCard?.id === subscription?.id}
                            />
                        </Link>
                    );
                }
                return subscription && (
                    <Sub
                        key={`Card-${subscription?.id}`}
                        subscription={subscription}
                        expended={expendedCard?.id === subscription?.id}
                    />
                );
            })}
        </div>
    );
}
