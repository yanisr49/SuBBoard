import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient(`${process.env.REACT_APP_API_ENDPOINT}/graphql`);

export { graphQLClient };
// graphQLClient.setHeader('Content-Type', 'application/json; charset=utf-8');
// graphQLClient.setHeader('authorization', 'Bearer ');
