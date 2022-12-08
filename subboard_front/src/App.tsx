/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SkeletonTheme } from 'react-loading-skeleton';
import Router from './router/router';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppStyle } from './AppStyle';
import { selectTheme } from './redux/store';
import { useAppDispatch, useAppSelector } from './redux/reduxHooks';
import { QUERY_NAMES } from './resources/Constants';
import { fetchCurrentUserQuery } from './graphql/queries';
import { updateUser } from './redux/userSlice';

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

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUserQuery = async () => {
            const fetchUser = await queryClient.fetchQuery([QUERY_NAMES.fetchUser], fetchCurrentUserQuery, {
                retry: false,
            });
            if (fetchUser.user) {
                dispatch(updateUser(fetchUser.user));
            }
        };

        // eslint-disable-next-line no-console
        fetchUserQuery().catch(() => dispatch(updateUser()));
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
