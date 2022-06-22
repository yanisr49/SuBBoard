import { gql } from 'graphql-request';
import { Mutation } from './generated/graphql';
import { graphQLClient } from './graphqlClient';
import { Themes } from '../theme';

const changeTheme = gql`
    mutation changeTheme($theme: String) {
        theme(theme: $theme)
    }
`;

export const changeThemeMutation = (theme: keyof Themes): Promise<Pick<Mutation, 'theme'>> => graphQLClient.request(changeTheme, { theme });
