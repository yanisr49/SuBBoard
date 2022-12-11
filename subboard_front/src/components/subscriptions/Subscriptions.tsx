/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sub from './subscription/Sub';
import { SubscriptionStyle } from './SubscriptionsStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import { QUERY_NAMES, TRANSITION_TIME } from '../../resources/Constants';
import { fetchSubscriptionsQuery } from '../../graphql/queries';
import { Maybe, Subscription } from '../../graphql/generated/graphql';
import useExpendedCard from './hooks/useExpendedCard';
import ROUTES_PATHS from '../../router/RoutesPath';
import useDelayedState from '../../resources/hooks/useDelayedState';
import Input from '../../resources/common/input/Input';

export default function Subscriptions() {
    const navigate = useNavigate();
    const location = useLocation();
    const [expendedCard, updateSubscriptions] = useExpendedCard();
    const theme = useAppSelector(selectTheme).value;
    const style = SubscriptionStyle(theme);

    const subscriptions = useQuery([QUERY_NAMES.fetchSubscription], () => fetchSubscriptionsQuery(), {
        onSuccess: (data) => updateSubscriptions(data.subscriptions),
    });

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

    const subs: Maybe<Subscription>[][] = [];
    for (let i = 0; i * 5 < (subscriptions.data?.subscriptions?.length ?? 0); i += 1) {
        if (subscriptions.data?.subscriptions?.length) {
            subs.push(subscriptions.data.subscriptions.slice(i * 5, ((i + 1) * 5)));
        }
    }

    return (
        <div css={style.SubscriptionContainer}>
            {/* <Input id="treygecv" name="kjsdkjvbn" onBlur={() => {}} /> */}
            <div className="subscriptionsHeader">header</div>
            <table cellSpacing={0} cellPadding={0}>
                {subs.map((subTr) => (
                    <tr>
                        {subTr.map((sub) => {
                            if (sub) {
                                return (
                                    <td>
                                        <span
                                            key={`Link-${sub?.id}`}
                                            onClick={() => handleOnClick(sub)}
                                            onKeyDown={(ev) => ev.key === 'Enter' && handleOnClick(sub)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <Sub
                                                key={`Card-${sub?.id}`}
                                                subscription={sub}
                                                expended={expendedCard?.id === sub?.id}
                                            />
                                        </span>
                                    </td>
                                );
                            }
                            return <></>;
                        })}
                    </tr>
                ))}
            </table>
        </div>
    );
}
