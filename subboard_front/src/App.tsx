/** @jsxImportSource @emotion/react */
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SkeletonTheme } from 'react-loading-skeleton';
import Router from './router/router';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppStyle } from './AppStyle';
import { selectTheme } from './redux/store';
import { useAppSelector } from './redux/reduxHooks';

function App() {
    const queryClient = new QueryClient();
    const theme = useAppSelector(selectTheme).value;
    const style = AppStyle(theme);

    queryClient.setDefaultOptions({
        queries: {
            refetchOnWindowFocus: false,
            // staleTime: Infinity,
        },
    });

    return (
        <div id="main" css={style.main}>
            <QueryClientProvider client={queryClient}>
                <SkeletonTheme
                    baseColor={theme.backgroundColor.secondary}
                    highlightColor={theme.backgroundColor.primaryIntermediate}
                >
                    <Router />
                </SkeletonTheme>
            </QueryClientProvider>
        </div>
    );
}

export default App;
