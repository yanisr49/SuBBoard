import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.scss';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './router';
import DarkTheme from './theme/DarkTheme';
import { LightTheme } from './theme';
import { selectTheme } from './redux/userSlice';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { updateToken } from './redux/tokenSlice';
import { TOKEN_STORE_NAME } from './resources/Constants';

function App() {
    const dispatch = useAppDispatch();

    const getThemeFromString = (themeName?: string | null) => {
        if (themeName === 'dark') {
            return DarkTheme;
        } if (themeName === 'light') {
            return LightTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DarkTheme : LightTheme;
    };

    const userTheme = useAppSelector(selectTheme);
    const currentTheme = getThemeFromString(userTheme);

    useEffect(() => {
        if (window.localStorage.getItem(TOKEN_STORE_NAME)) {
            dispatch(updateToken(window.localStorage.getItem(TOKEN_STORE_NAME) ?? undefined));
        }
    }, []);

    const queryClient = new QueryClient();

    return (
        <div id="main">
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={currentTheme}>
                        <Router />
                    </ThemeProvider>
                </QueryClientProvider>
            </HelmetProvider>
        </div>
    );
}

export default App;
