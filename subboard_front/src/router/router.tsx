import React from 'react';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../auth/Auth';
import Profil from '../auth/Profil';
import Calendar from '../components/calendar/Calendar';
import Subscriptions from '../components/home/Subscriptions';
import SubboardLogo from '../img/logo.png';

function Router() {
    return (
        <BrowserRouter>
            <header className="subboard-logo">
                <img
                    src={SubboardLogo}
                    alt="logo"
                    style={{
                        height: '100%',
                    }}
                />
                <Profil />
            </header>
            <Routes>
                <Route path="/" element={<Navigate to={`${process.env.REACT_APP_PUBLIC_URL}`} />} />
                <Route path={`${process.env.REACT_APP_PUBLIC_URL}/subscriptions`} element={<Subscriptions />} />
                <Route path={`${process.env.REACT_APP_PUBLIC_URL}/login/:newToken`} element={<Auth />} />
                <Route path="/extra/teletravail" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
