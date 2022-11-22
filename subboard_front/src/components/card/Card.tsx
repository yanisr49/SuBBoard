/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, {
    CSSProperties, useCallback,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Chip from '../chip/Chip';
import image from '../../resources/img/netflix_logo.png';
import SubscriptionModel from '../../models/SubscriptionModel';

interface Props {
  subscription: SubscriptionModel;
}

export default function Card({ subscription }: Props) {
    const [cardStyle, setCardStyle] = React.useState<CSSProperties>({});

    const navigate = useNavigate();
    const location = useLocation();

    const urlSubName = location.pathname.split('/').length > 2 ? location.pathname.split('/')[2] : undefined;
    const isSelected = urlSubName === subscription.name;
    const className = isSelected ? 'innerCard selectedCard ' : 'innerCard';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cardRef = useCallback((node: any) => {
        setCardStyle({
            position: 'absolute',
            top: isSelected ? 0 : node?.parentElement.offsetTop,
            left: isSelected ? 0 : node?.parentElement.offsetLeft,
        });
    }, [isSelected]);

    return (
        <div
            className="card"
            onClick={() => navigate(`/subscriptions/${subscription.name}`)}
            onKeyDown={(ev) => ev.key === 'Enter' && navigate(`/subscriptions/${subscription.name}`)}
            role="button"
            tabIndex={0}
        >
            <div
                className={className}
                ref={cardRef}
                style={cardStyle}
            >
                <div className="cardHead">
                    <div className="cardHeadText">{subscription.name}</div>
                    <img src={image} className="cardHeadLogo" alt={`Logo ${subscription.name}`} />
                </div>
                <div className="cardBody">
                    <div className="cardBodyChips">
                        {subscription.tags.map((tag) => (
                            <Chip key={tag.id} tag={tag} />
                        ))}
                    </div>
                    jhfjjhjgjhg
                </div>
            </div>
        </div>
    );
}
