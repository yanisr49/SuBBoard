import { GraphQLClient } from 'graphql-request';
import { TOKEN_STORE_NAME } from '../resources/Constants';

const graphQLClient = new GraphQLClient(`${process.env.REACT_APP_API_ENDPOINT}/graphql`, {
    headers: () => ({
        authorization: `Bearer ${window.localStorage.getItem(TOKEN_STORE_NAME)}`,
    }),
});

export { graphQLClient };
