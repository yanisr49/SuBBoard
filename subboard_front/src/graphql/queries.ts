import { gql } from 'graphql-request';
import { Query } from './generated/graphql';
import { graphQLClient } from './graphqlClient';

const getCurrentUser = gql`
query User {
  user {
    email
    theme
  }
}
`;

export const getCurrentUserQuery = (): Promise<Query> => graphQLClient.request(getCurrentUser);
