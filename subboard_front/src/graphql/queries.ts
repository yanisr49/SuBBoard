import { gql } from 'graphql-request';
import { Query } from './generated/graphql';
import { graphQLClient } from './graphqlClient';

const fetchCurrentUser = gql`
    query User {
        user {
            email
            theme
            profilPicture
        }
    }
`;

export const fetchCurrentUserQuery = (): Promise<Pick<Query, 'user'>> => graphQLClient.request(fetchCurrentUser);

const fetchTTDays = gql`
    query TTDays($startDate: Date!, $endDate: Date!) {
        ttDays(startDate: $startDate, endDate: $endDate) {
            date
        }
    }
`;

// eslint-disable-next-line max-len
export const fetchTTDaysQuery = (filters: {startDate: Date, endDate: Date}): Promise<Pick<Query, 'ttDays'>> => graphQLClient.request(fetchTTDays, {
    startDate: filters.startDate,
    endDate: filters.endDate,
});

const fetchSubscriptions = gql`
    query subscriptions($name: String) {
        subscriptions(name: $name) {
        name
        logo
        color
        dueDate
        frequency
        customFrequency
        price
        promotion
        endDatePromotion
        }
    }
`;

export const fetchSubscriptionsQuery = (name?: string): Promise<Pick<Query, 'subscriptions'>> => graphQLClient.request(fetchSubscriptions, {
    name,
});
