const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        user: User
        ttDays(day: Int, month: Int, year: Int): [TTDays]
    }

    type User {
        email: String!
        theme: String
        profilPicture: String
        subscriptions: [Subscription]
    }

    type Subscription {
        name: String
        color: String
    }

    type TTDays {
        userEmail: String!
        day: Int!
        month: Int!
        year: Int!
    }



    type Mutation {
        addSubscription(email: String!, name: String!): Subscription
        theme(theme: String): String
        addTTDay(day: Int!, month: Int!, year: Int!): TTDays
        removeTTDay(day: Int!, month: Int!, year: Int!): TTDays
    }
`);

module.exports = schema;
