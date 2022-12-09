/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SkeletonTheme } from 'react-loading-skeleton';
import Router from './router/router';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppStyle } from './AppStyle';
import { selectTheme, selectUser } from './redux/store';
import { useAppDispatch, useAppSelector } from './redux/reduxHooks';
import { loggin } from './redux/userSlice';

function App() {
    const queryClient = new QueryClient();
    const theme = useAppSelector(selectTheme).value;
    const user = useAppSelector(selectUser);
    const style = AppStyle(theme);

    queryClient.setDefaultOptions({
        queries: {
            refetchOnWindowFocus: false,
            // staleTime: Infinity,
        },
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.status === 'loading') {
            // dispatch(loggin());
        }
    }, []);

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
