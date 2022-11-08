import { gql } from 'graphql-request';
import { Mutation, TtDays } from './generated/graphql';
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
    mutation addTTDay($day: Int!, $month: Int!, $year: Int!) {
        addTTDay(day: $day, month: $month, year: $year) {
            day,
            month,
            year
        }
    }
`;

export const addTTDay = (ttDay: Omit<TtDays, 'userEmail'>): Promise<Pick<Mutation, 'addTTDay'>> => graphQLClient.request(addTTDayMutation, {
    day: ttDay.day,
    month: ttDay.month,
    year: ttDay.year,
});

const removeTTDayMutation = gql`
    mutation removeTTDay($day: Int!, $month: Int!, $year: Int!) {
        removeTTDay(day: $day, month: $month, year: $year) {
            day,
            month,
            year
        }
    }
`;

export const removeTTDay = (ttDay: Omit<TtDays, 'userEmail'>): Promise<Pick<Mutation, 'removeTTDay'>> => graphQLClient.request(removeTTDayMutation, {
    day: ttDay.day,
    month: ttDay.month,
    year: ttDay.year,
});
