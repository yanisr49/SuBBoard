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
