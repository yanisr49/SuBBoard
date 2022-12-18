/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { throttle } from 'lodash';
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

    const [projectedInsertPosition, setProjectedInsertPosition] = useState<number>(-1);

    useEffect(() => {
        const t = throttle((e: MouseEvent) => {
            if (e.clientX > 0 && e.clientY > 0) {
                let index = -1;
                const subss = document.getElementsByTagName('td');
                for (let i = 0; subss.length > i && index === -1; i += 1) {
                    if (document.getElementsByTagName('td')[i].getBoundingClientRect().left <= e.clientX
                    && document.getElementsByTagName('td')[i].getBoundingClientRect().right >= e.clientX
                    && document.getElementsByTagName('td')[i].getBoundingClientRect().top <= e.clientY
                    && document.getElementsByTagName('td')[i].getBoundingClientRect().bottom >= e.clientY) {
                        index = i - 1;
                    }
                }
                setProjectedInsertPosition(index);
            }
        }, 100);

        const tt = () => {
            setProjectedInsertPosition(-1);
            document.removeEventListener('drag', tt);
        };

        document.addEventListener('drag', t);
        document.addEventListener('dragend', tt);

        return () => {
            document.removeEventListener('drag', t);
            document.removeEventListener('dragend', tt);
        };
    }, []);

    const [draggedSub, setDraggedSub] = useState<Subscription>();

    useEffect(() => {
        if (projectedInsertPosition > -1 && subscriptions.data?.subscriptions?.length && projectedInsertPosition < subscriptions.data.subscriptions.length) {
            console.log(projectedInsertPosition);
            queryClient.setQueryData([QUERY_NAMES.fetchSubscription], (oldData: Pick<Query, 'subscriptions'> | undefined) => {
                const newSubscriptions = {
                    subscriptions: oldData?.subscriptions,
                } as Pick<Query, 'subscriptions'>;

                if (oldData?.subscriptions && draggedSub) {
                    const indexDraggedSub = oldData.subscriptions.findIndex((oldSub) => oldSub.id === draggedSub.id);
                    if (projectedInsertPosition !== indexDraggedSub) {
                        const subscriptionsFiltered = oldData.subscriptions.filter((sub) => sub?.id !== draggedSub?.id);
                        console.log(subscriptionsFiltered.slice(0, 4));
                        newSubscriptions.subscriptions = [
                            ...subscriptionsFiltered.slice(0, projectedInsertPosition),
                            draggedSub,
                            ...subscriptionsFiltered.slice(projectedInsertPosition)];
                    }
                }

                return newSubscriptions;
            });
        }
    }, [projectedInsertPosition]);

    return (
        <div css={style.SubscriptionContainer}>
            {/* <Input id="treygecv" name="kjsdkjvbn" onBlur={() => {}} /> */}
            <div className="subscriptionsHeader">header</div>

            <table cellSpacing={0} cellPadding={0}>
                <tbody>
                    {Array.from(Array(Math.ceil(((subscriptions.data?.subscriptions?.length ?? 0) + 1) / 5)).keys()).map((index1) => (
                        <tr key={`tr-${index1}`}>
                            {[0, 1, 2, 3, 4].map((index2) => <td key={`td-${index1}-${index2}`} />)}
                        </tr>
                    )) }
                </tbody>
            </table>

            <NewSubComponent
                // eslint-disable-next-line react/no-array-index-key
                key="Card-new"
                loading={subscriptions.isLoading}
            />

            {subscriptions.data?.subscriptions?.map((sub, index) => (
                <span
                    // eslint-disable-next-line react/no-array-index-key
                    key={`Link-${sub.id}`}
                    onClick={() => handleOnClick(sub)}
                    onKeyDown={(ev) => ev.key === 'Enter' && handleOnClick(sub)}
                    role="button"
                    tabIndex={0}
                >
                    <Sub
                        // eslint-disable-next-line react/no-array-index-key
                        key={`Card-${sub.id}`}
                        loading={subscriptions.isLoading}
                        subscription={sub}
                        expended={expendedCard?.id === sub.id}
                        index={index + 1}
                        setDraggedSub={setDraggedSub}
                    />
                </span>
            ))}
        </div>
    );
}
