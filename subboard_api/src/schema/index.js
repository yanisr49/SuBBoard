const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        user: User
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



    type Mutation {
        addSubscription(email: String!, name: String!): Subscription
        theme(theme: String): String
    }
`);

module.exports = schema;
