const { buildSchema,  } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    scalar Date

    type Query {
        user: User
        ttDays(startDate: Date!, endDate: Date!): [TTDays]
        subscriptions(name: String): [Subscription]
    }

    type User {
        email: String!
        theme: String
        profilPicture: String
    }

    type Subscription {
        userEmail: String!
        initDate: Date!
        name: String!
        logo: String!
        color: String!
        dueDate: Date!
        frequency: Frequency!
        customFrequency: Int
        price: Float!
        promotion: Float
        endDatePromotion: Date
    }

    enum Frequency {
        DAILY
        WEEKLY
        BIMONTHLY
        MONTHLY
        BIQUARTERLY
        QUARTERLY
        BIANNUAL
        ANNUAL
        CUSTOM
    }

    type TTDays {
        userEmail: String!
        date: Date!
    }




    type Mutation {
        addSubscription(name: String!, logo: String!, color: String!, dueDate: Date!, frequency: Frequency!, customFrequency: Int, price: Float!, promotion: Float, endDatePromotion: Date): Subscription
        theme(theme: String): String
        addTTDay(date: Date!): TTDays
        removeTTDay(date: Date!): TTDays
    }
`);

Object.assign(schema._typeMap.Date, {
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value // value sent to the client
    },
    parseLiteral(ast) {
        return ast
    }
  })

module.exports = schema;
