import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient(`${process.env.REACT_APP_API_ENDPOINT}/graphql`, {
    credentials: 'include',
    mode: 'cors',
});

export { graphQLClient };
