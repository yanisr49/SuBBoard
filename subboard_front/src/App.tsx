import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.scss';
import jwtDecode from 'jwt-decode';
import { Theme, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './router';
import AuthContext from './auth/AuthContext';
import DarkTheme from './theme/DarkTheme';
import ThemeContext from './theme/ThemeContext';
import { graphQLClient } from './graphql/graphqlRequest';

function App() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const getCredentials = (): string | undefined => {
        const token = window.localStorage.getItem('token');
        return token ?? undefined;

        // return token ? jwtDecode(token) : undefined;
    };

    const [token, setToken] = React.useState<string | undefined>(getCredentials());
    const authentication = React.useMemo(
        () => ({
            token,
            updateToken: (newToken?: string) => {
                // setToken(newToken);
                if (newToken) {
                    console.log(newToken);
                    graphQLClient.setHeaders({
                        authorization: `Bearer ${newToken}`,
                    });
                    window.localStorage.setItem('token', newToken);
                } else if (window.localStorage.getItem('token')) {
                    window.localStorage.removeItem('token');
                }
            },
        }),
        [token],
    );

    const [theme, setTheme] = React.useState<Theme>(DarkTheme);
    const themeContext = React.useMemo(
        () => ({
            theme,
            toggleTheme: (newTheme: Theme) => setTheme(newTheme),
        }),
        [theme],
    );

    const queryClient = new QueryClient();

    return (
        <div id="main">
            <HelmetProvider>
                <AuthContext.Provider value={authentication}>
                    <QueryClientProvider client={queryClient}>
                        <ThemeContext.Provider value={themeContext}>
                            <ThemeProvider theme={theme}>
                                <Router />
                            </ThemeProvider>
                        </ThemeContext.Provider>
                    </QueryClientProvider>
                </AuthContext.Provider>
            </HelmetProvider>
        </div>
    );
}

export default App;
