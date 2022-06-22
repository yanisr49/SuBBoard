import { gql } from 'graphql-request';
import { graphQLClient } from './graphqlClient';

const changeTheme = gql`
mutation changeTheme($theme: String) {
  theme(theme: $theme)
}
`;

export const changeThemeMutation = (theme: string | undefined) => graphQLClient.request(changeTheme, { theme });
