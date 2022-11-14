import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../auth/Auth';
import Profil from '../auth/Profil';
import Calendar from '../components/calendar/Calendar';
import Subscriptions from '../components/home/Subscriptions';

function Router() {
    return (
        <BrowserRouter>
            <Profil />
            <Routes>
                <Route path="/" element={<Navigate to={`${process.env.REACT_APP_PUBLIC_URL}`} />} />
                <Route path={`${process.env.REACT_APP_PUBLIC_URL}/subscriptions`} element={<Subscriptions />} />
                <Route path={`${process.env.REACT_APP_PUBLIC_URL}/login/:newToken`} element={<Auth />} />
                <Route path="/teletravail" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
