import React, { useContext } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Auth from './auth/Auth';
import AuthContext from './auth/AuthContext';
import Profil from './auth/Profil';
import Subscriptions from './components/home/Subscriptions';

function Router() {
  const { credentials } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <header className="subboard-logo">
        SuBBoard
        <Profil />
      </header>
      <Routes>
        <Route path="/" element={<Subscriptions />} />
        <Route path="/login/:token" element={credentials ? <Navigate to="/subscriptions" replace /> : <Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
