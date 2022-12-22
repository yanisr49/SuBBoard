/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { throttle } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import Sub from './subscription/Sub';
import { SubscriptionStyle } from './SubscriptionsStyle';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme } from '../../redux/store';
import { QUERY_NAMES } from '../../resources/Constants';
import { fetchSubscriptionsQuery } from '../../graphql/queries';
import { Query, Subscription } from '../../graphql/generated/graphql';
import useExpendedCard from './hooks/useExpendedCard';
import ROUTES_PATHS from '../../router/RoutesPath';
import Input from '../../resources/components/input/Input';
import NewSubComponent from './newSub/NewSub';

export default function Subscriptions() {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState<string>('');
    const [expendedCard, updateSubscriptions] = useExpendedCard();
    const theme = useAppSelector(selectTheme).value;
    const style = SubscriptionStyle(theme);

    const queryClient = useQueryClient();
    const subscriptions = useQuery({
        queryKey: [QUERY_NAMES.fetchSubscription],
        queryFn: () => fetchSubscriptionsQuery(),
        onSuccess: (data) => updateSubscriptions(data.subscriptions),
    });

    /**
     * Filtre les abonnements qui contiennent le texte précisé, renvoi tous les abonnements si aucun text précisé
     * @returns Liste d'abonnements
     */
    const getFilteredSubscriptions = () => {
        if (subscriptions.data?.subscriptions && filter && filter !== '') {
            return subscriptions.data.subscriptions.filter((sub) => sub.name?.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
        }
        return subscriptions.data?.subscriptions ?? [];
    };

    /**
     * Redirige vers un abonnement
     * @param subscription abonnement clické
     */
    const handleOnClick = (subscription: Subscription) => {
        if (expendedCard?.id !== subscription?.id) {
            navigate(`${ROUTES_PATHS.subscriptions}/${(subscription.name ?? subscription.id).replaceAll(' ', '_')}`);
        }
    };

    // Affiche le scroll vertical lorsque l'on est sur la page des abonnements, cache le scroll lorsque l'on est sur un abonnement
    useEffect(() => {
        document.getElementsByTagName('html')[0].style.overflowY = location.pathname === ROUTES_PATHS.subscriptions ? 'auto' : 'hidden';
    }, [location]);

    // Index de la nouvelle position de l'abonnement étant en train d'être dragué
    const [projectedInsertPosition, setProjectedInsertPosition] = useState<number>(-1);

    useEffect(() => {
        // Trouve l'index de l'abonnement sur lequel le curseur est positionné
        const calculNewSubIndex = throttle((e: MouseEvent) => {
            if (e.clientX > 0 && e.clientY > 0) {
                let index = -1;
                const subs = document.getElementsByTagName('td');
                for (let i = 0; subs.length > i && index === -1; i += 1) {
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

        document.addEventListener('drag', calculNewSubIndex);

        return () => {
            document.removeEventListener('drag', calculNewSubIndex);
        };
    }, []);

    const [draggedSub, setDraggedSub] = useState<Subscription>();

    useEffect(() => {
        // Si un abonnement doit être déplacé
        if (projectedInsertPosition > -1 && subscriptions.data?.subscriptions?.length && projectedInsertPosition < subscriptions.data.subscriptions.length) {
            queryClient.setQueryData([QUERY_NAMES.fetchSubscription], (oldData: Pick<Query, 'subscriptions'> | undefined) => {
                const newSubscriptions = {
                    subscriptions: oldData?.subscriptions,
                } as Pick<Query, 'subscriptions'>;

                if (oldData?.subscriptions && draggedSub) {
                    // Index de l'abonnement à déplacer
                    const indexDraggedSub = oldData.subscriptions.findIndex((oldSub) => oldSub.id === draggedSub.id);
                    // Si l'abonnement doit être déplacé à un endroit différent du sien
                    if (projectedInsertPosition !== indexDraggedSub) {
                        // Tous les abonnements sauf celui à déplacer
                        const subscriptionsFiltered = oldData.subscriptions.filter((sub) => sub?.id !== draggedSub?.id);

                        // Nouvelle ordre des abonnements
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
            <div className="subscriptionsHeader">
                <Input id="filtre-input" name="Filtrer" handleChange={setFilter} />
            </div>

            <table cellSpacing={0} cellPadding={0}>
                <tbody>
                    {Array.from(Array(Math.ceil((getFilteredSubscriptions().length + 1) / 5)).keys()).map((index1) => (
                        <tr key={`tr-${index1}`}>
                            {[0, 1, 2, 3, 4].map((index2) => <td key={`td-${index1}-${index2}`}>{subscriptions.isLoading && <Skeleton />}</td>)}
                        </tr>
                    )) }
                </tbody>
            </table>

            <NewSubComponent
                key="Card-new"
                loading={subscriptions.isLoading}
            />

            {getFilteredSubscriptions().map((sub, index) => (
                <span
                    key={`Link-${sub.id}`}
                    onClick={() => handleOnClick(sub)}
                    onKeyDown={(ev) => ev.key === 'Enter' && handleOnClick(sub)}
                    role="button"
                    tabIndex={0}
                >
                    <Sub
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
