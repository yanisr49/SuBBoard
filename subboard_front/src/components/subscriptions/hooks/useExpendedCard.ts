import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Maybe, Subscription } from '../../../graphql/generated/graphql';

export default function useExpendedCard() {
    const location = useLocation();
    const [subscriptions, updateSubscriptions] = useState<Maybe<Maybe<Subscription>[]>>();
    const [expendedCard, setExpendedCard] = useState<Subscription>();

    useEffect(() => {
        const cardName = location.pathname.split('/')[2]?.replaceAll('_', ' ');
        if (cardName && subscriptions?.length) {
            const subByName = subscriptions.find((sub) => sub?.name === cardName);
            if (subByName) {
                setExpendedCard(subByName);
            } else {
                setExpendedCard(subscriptions.find((sub) => sub?.id === cardName) ?? undefined);
            }
        } else {
            setExpendedCard(undefined);
        }
    }, [location, subscriptions]);

    return [expendedCard, updateSubscriptions] as const;
}
