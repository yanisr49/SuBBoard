import Auth from '../components/auth/Auth';
import Calendar from '../components/calendar/Calendar';
import Subscriptions from '../components/home/Subscriptions';
import WelcomePage from '../components/welcome/WelcomePage';

type Route = {
    path: string,
    element: React.ElementType,
    loggedIn: boolean,
}

export const ROUTES: Route[] = [
    {
        path: '/',
        element: WelcomePage,
        loggedIn: false,
    },
    {
        path: '/teletravail',
        element: Calendar,
        loggedIn: true,
    },
    {
        path: '/login/:newToken',
        element: Auth,
        loggedIn: false,
    },
    {
        path: `${process.env.REACT_APP_PUBLIC_URL}/subscriptions`,
        element: Subscriptions,
        loggedIn: true,
    },
];
