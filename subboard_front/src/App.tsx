import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './router/router';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
    const queryClient = new QueryClient();

    /*
    queryClient.setDefaultOptions({
        queries: {
            staleTime: Infinity,
        },
    });
*/

    return (
        <div id="main">
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <Router />
                </QueryClientProvider>
            </HelmetProvider>
        </div>
    );
}

export default App;
