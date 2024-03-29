import Calendar from '../components/calendar/Calendar';
import Subscriptions from '../components/subscriptions/Subscriptions';
import WelcomePage from '../components/welcome/WelcomePage';
import ROUTES_PATHS from './RoutesPath';

type Route = {
    path: string,
    element: React.ReactNode,
    loggedIn: boolean,
}

type Routes = {
    [key: string]: Route;
}

export const ROUTES: Routes = {
    welcomePage: {
        path: ROUTES_PATHS.welcomePage,
        element: <WelcomePage />,
        loggedIn: false,
    },
    workFromHome: {
        path: ROUTES_PATHS.workFromHome,
        element: <Calendar />,
        loggedIn: true,
    },
    subscriptions: {
        path: `${ROUTES_PATHS.subscriptions}/*`,
        element: <Subscriptions />,
        loggedIn: true,
    },
};
