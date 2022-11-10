import { gql } from 'graphql-request';
import { Mutation } from './generated/graphql';
import { graphQLClient } from './graphqlClient';
import { Themes } from '../theme';

const changeTheme = gql`
    mutation changeTheme($theme: String) {
        theme(theme: $theme)
    }
`;

export const changeThemeMutation = (theme: keyof Themes): Promise<Pick<Mutation, 'theme'>> => graphQLClient.request(changeTheme, {
    theme,
});

const addTTDayMutation = gql`
    mutation addTTDay($date: Date!) {
        addTTDay(date: $date) {
            date
        }
    }
`;

export const addTTDay = (date: Date): Promise<Pick<Mutation, 'addTTDay'>> => graphQLClient.request(addTTDayMutation, {
    date: date.toString(),
});

const removeTTDayMutation = gql`
    mutation removeTTDay($date: Date!) {
        removeTTDay(date: $date) {
            date
        }
    }
`;

export const removeTTDay = (date: Date): Promise<Pick<Mutation, 'removeTTDay'>> => graphQLClient.request(removeTTDayMutation, {
    date: date.toString(),
});
