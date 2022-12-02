import { gql } from 'graphql-request';
import { Mutation, Subscription } from './generated/graphql';
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

const addSubscriptionMutation = gql`
    mutation addSubscription(
        $name: String!,
        $logo: String!,
        $color: String!,
        $dueDate: Date!,
        $frequency: Frequency!,
        $customFrequency: Int,
        $price: Float!,
        $promotion: Float,
        $endDatePromotion: Date
    ) {
        addSubscription(
            name: $name,
            logo: $logo,
            color: $color,
            dueDate: $dueDate,
            frequency: $frequency,
            customFrequency: $customFrequency,
            price: $price,
            promotion: $promotion,
            endDatePromotion: $endDatePromotion
        ) {
            name
        }
    }
`;

export const addSubscription = ({
    name,
    logo,
    color,
    dueDate,
    frequency,
    customFrequency,
    price,
    promotion,
    endDatePromotion,
}: Omit<Omit<Subscription, 'initDate'>, 'userEmail'>): Promise<Pick<Mutation, 'addSubscription'>> => graphQLClient.request(addSubscriptionMutation, {
    name,
    logo,
    color,
    dueDate,
    frequency,
    customFrequency,
    price,
    promotion,
    endDatePromotion,
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
