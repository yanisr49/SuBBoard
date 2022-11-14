/** @jsxImportSource @emotion/react */
import { HelmetProvider } from 'react-helmet-async';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './router/router';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppStyle } from './AppStyle';
import themes from './theme';
import { selectTheme } from './redux/store';
import { useAppSelector } from './hooks/reduxHooks';

function App() {
    const queryClient = new QueryClient();
    const theme = useAppSelector(selectTheme);
    const style = AppStyle(themes[theme.key]);

    /*
    queryClient.setDefaultOptions({
        queries: {
            staleTime: Infinity,
        },
    });
*/

    return (
        <div id="main" css={style.main}>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <Router />
                </QueryClientProvider>
            </HelmetProvider>
        </div>
    );
}

export default App;
