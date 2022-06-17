/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
import React from 'react';
import Card from '../card/Card';
import SubscriptionModel from '../../models/SubscriptionModel';
// import SubscriptionService from '../../services/SubscriptionService';
import './SubscriptionsStyle.scss';

// background-color: ${(props) => (props.theme.color === 'dark' ? COLORS.DARK_1 : COLORS.LIGHT_1)};
// const { color, toggleColor } = useContext(ThemeContext);

export default function Subscriptions() {
    // const [cards, loading, refetch] = SubscriptionService.useAllSubscriptions(1);
    const [displayCards] = React.useState<SubscriptionModel[]>([]);

    return (
        <div className="subscriptions">
            {displayCards.map((subscription: SubscriptionModel) => (
                <Card key={subscription.id} subscription={subscription} />
            ))}
        </div>
    );
}
