const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    user(email: String!): User
  }

  type User {
    email: String!
    token: String!
    subscriptions: [Subscription]
  }

  type Subscription {
    name: String
    color: String
  }

  type Mutation {
    addSubscription(email: String!, name: String!): Subscription
  }
`);

module.exports = schema;
