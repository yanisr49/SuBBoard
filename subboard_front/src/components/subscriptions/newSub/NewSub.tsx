/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectTheme } from '../../../redux/store';
import { Query } from '../../../graphql/generated/graphql';
import { createSubscription } from '../../../graphql/mutations';
import { QUERY_NAMES } from '../../../resources/Constants';
import Spinner from '../../../resources/components/Spinner';
import { NewSubStyle } from './NewSubStyle';

interface Props {
  loading: boolean;
}

export default React.memo(({ loading }: Props) => {
    const theme = useAppSelector(selectTheme).value;

    const [position, setPosition] = React.useState<{
        top?: number;
        left?: number;
    }>();

    const { newSubContainerStyle, newSubStyle } = NewSubStyle(theme, loading, position);

    const queryClient = useQueryClient();
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

    const handleCreateSub = () => {
        createSubscriptionMutation.mutate();
    };

    const relocate = () => {
        const tds = document.getElementsByTagName('td');
        if (tds.length > 0) {
            setPosition({
                top: tds[0].getBoundingClientRect().top + 10,
                left: tds[0].getBoundingClientRect().left + 10,
            });
        }
    };

    useLayoutEffect(() => {
        relocate();

        window.addEventListener('resize', relocate);
        return () => {
            window.removeEventListener('resize', relocate);
        };
    }, [loading]);

    return (
        <div
            css={newSubContainerStyle}
            className="subscription"
            onClick={handleCreateSub}
            onKeyDown={(ev) => ev.key === 'Enter' && handleCreateSub()}
            role="button"
            tabIndex={0}
        >
            <div css={newSubStyle}>
                {createSubscriptionMutation.isLoading ? <Spinner loading={createSubscriptionMutation.isLoading} /> : '+'}
            </div>
        </div>
    );
});
