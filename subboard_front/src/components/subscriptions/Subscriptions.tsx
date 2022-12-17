/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sub from './subscription/Sub';
import { SubscriptionStyle } from './SubscriptionsStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import { QUERY_NAMES, TRANSITION_TIME } from '../../resources/Constants';
import { fetchSubscriptionsQuery } from '../../graphql/queries';
import { Maybe, Query, Subscription } from '../../graphql/generated/graphql';
import useExpendedCard from './hooks/useExpendedCard';
import ROUTES_PATHS from '../../router/RoutesPath';
import useDelayedState from '../../resources/hooks/useDelayedState';
import Input from '../../resources/common/input/Input';
import NewSubComponent from './newSub/NewSub';
import { createSubscription } from '../../graphql/mutations';

export default function Subscriptions() {
    const navigate = useNavigate();
    const location = useLocation();
    const [expendedCard, updateSubscriptions] = useExpendedCard();
    const theme = useAppSelector(selectTheme).value;
    const style = SubscriptionStyle(theme);

    const queryClient = useQueryClient();
    const subscriptions = useQuery({
        queryKey: [QUERY_NAMES.fetchSubscription],
        queryFn: () => fetchSubscriptionsQuery(),
        onSuccess: (data) => updateSubscriptions(data.subscriptions),
    });

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

    console.log(subscriptions);

    const handleOnClick = (subscription: Subscription) => {
        if (expendedCard?.id !== subscription?.id) {
            navigate(`${ROUTES_PATHS.subscriptions}/${(subscription.name ?? subscription.id).replaceAll(' ', '_')}`);
            document.body.style.overflow = 'hidden';
        }
    };

    useEffect(() => {
        if (location.pathname === ROUTES_PATHS.subscriptions) {
            document.body.style.overflow = 'auto';
        }
    }, [location]);

    const subs: Maybe<Subscription | 'new'>[][] = subscriptions.data ? [['new', ...(subscriptions.data?.subscriptions?.slice(0, 4) ?? [])]] : [];
    for (let i = 1; i * 5 < (subscriptions.data?.subscriptions?.length ?? 0); i += 1) {
        if (subscriptions.data?.subscriptions?.length) {
            subs.push(subscriptions.data.subscriptions.slice(i * 5 - 1, ((i + 1) * 5 - 1)));
        }
    }

    const handleCreateSub = () => {
        createSubscriptionMutation.mutate();
    };

    return (
        <div css={style.SubscriptionContainer}>
            {/* <Input id="treygecv" name="kjsdkjvbn" onBlur={() => {}} /> */}
            <div className="subscriptionsHeader">header</div>
            <table cellSpacing={0} cellPadding={0}>
                {subs.map((subTr, ind) => (
                    <tr
                        // eslint-disable-next-line react/no-array-index-key
                        key={`Link-${ind}-tr`}
                    >
                        {subTr.map((sub, ind2) => {
                            if (sub && typeof sub === 'object') {
                                return (
                                    <td
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={`Link-${sub?.id}-td`}
                                    >
                                        <span
                                        // eslint-disable-next-line react/no-array-index-key
                                            key={`Link-${sub?.id}`}
                                            onClick={() => handleOnClick(sub)}
                                            onKeyDown={(ev) => ev.key === 'Enter' && handleOnClick(sub)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <Sub
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={`Card-${sub?.id}`}
                                                subscription={sub}
                                                expended={expendedCard?.id === sub?.id}
                                                index={ind * 5 + ind2}
                                            />
                                        </span>
                                    </td>
                                );
                            }
                            return (
                                <td
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={`Link-${ind}-new-td`}
                                >
                                    <span
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={`Link-${ind}-new`}
                                        onClick={handleCreateSub}
                                        onKeyDown={(ev) => ev.key === 'Enter' && handleCreateSub()}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <NewSubComponent
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={`Card-${ind}-new`}
                                        />
                                    </span>
                                </td>
                            );
                        })}
                        {subs.length < 5 && Array.from(Array(5 - subs[0].length).keys()).map((key) => <td key={key} />)}
                    </tr>
                ))}
            </table>
        </div>
    );
}
