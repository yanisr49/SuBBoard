/* eslint-disable max-len */
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

const createSubscriptionMutation = gql`
    mutation createSubscription {
        createSubscription {
            id
        }
    }
`;

export const createSubscription = (): Promise<Pick<Mutation, 'createSubscription'>> => graphQLClient.request(createSubscriptionMutation);

const editSubscriptionMutation = gql`
    mutation addSubscription(
        $id: String,
        $name: String,
        $logo: String,
        $color: String,
        $dueDate: Date,
        $frequency: Frequency,
        $customFrequency: Int,
        $price: Float,
        $promotion: Float,
        $endDatePromotion: Date
    ) {
        editSubscription(
            id: $id,
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
            id
        }
    }
`;

export const editSubscription = ({
    id,
    name,
    logo,
    color,
    dueDate,
    frequency,
    customFrequency,
    price,
    promotion,
    endDatePromotion,
}: Omit<Omit<Subscription, 'initDate'>, 'userEmail'>): Promise<Pick<Mutation, 'editSubscription'>> => graphQLClient.request(editSubscriptionMutation, {
    id,
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

const deleteSubscriptionMutation = gql`
    mutation deleteSubscription($id: String!) {
        deleteSubscription(id: $id)
    }
`;

export const deleteSubscription = (id: string): Promise<Pick<Mutation, 'deleteSubscription'>> => graphQLClient.request(deleteSubscriptionMutation, {
    id,
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
