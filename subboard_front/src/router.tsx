import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import Auth from './auth/Auth';
import Profil from './auth/Profil';
import Subscriptions from './components/home/Subscriptions';

function Router() {
    return (
        <BrowserRouter>
            <header className="subboard-logo">
                SuBBoard
                <Profil />
            </header>
            <Routes>
                <Route path="/" element={<Subscriptions />} />
                <Route path="/login/:newToken" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
