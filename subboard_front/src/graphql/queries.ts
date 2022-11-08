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

const fetchCurrentMonthTTDays = gql`
    query TTDays($day: Int, $month: Int, $year: Int) {
        ttDays(day: $day, month: $month, year: $year) {
            day
            month
            year
        }
    }
`;

// eslint-disable-next-line max-len
export const fetchCurrentMonthTTDaysQuery = (filters: {day?: number, month?: number, year?: number}): Promise<Pick<Query, 'ttDays'>> => graphQLClient.request(fetchCurrentMonthTTDays, {
    day: filters.day,
    month: filters.month,
    year: filters.year,
});
