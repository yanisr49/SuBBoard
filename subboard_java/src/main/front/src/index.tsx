import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
});

const test = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: 'Bearer token'
        }
    }
})

const client = new ApolloClient({
    link: test.concat(httpLink),
    cache: new InMemoryCache(),
});

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
