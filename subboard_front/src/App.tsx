/** @jsxImportSource @emotion/react */
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SkeletonTheme } from 'react-loading-skeleton';
import Router from './router/router';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppStyle } from './AppStyle';
import { selectTheme, selectUser } from './redux/store';
import { useAppSelector } from './redux/reduxHooks';

function App() {
    const queryClient = new QueryClient();
    const theme = useAppSelector(selectTheme).value;
    const user = useAppSelector(selectUser);
    const style = AppStyle(theme);

    queryClient.setDefaultOptions({
        queries: {
            refetchOnWindowFocus: false,
            enabled: user.status === 'idle',
            // staleTime: 10000,
        },
    });

    return (
        <div id="main" css={style.main}>
            <QueryClientProvider client={queryClient}>
                <SkeletonTheme
                    baseColor={theme.backgroundColor.secondary}
                    highlightColor={theme.backgroundColor.primaryIntermediate}
                    duration={1.3}
                >
                    <Router />
                </SkeletonTheme>
            </QueryClientProvider>
        </div>
    );
}

export default App;
