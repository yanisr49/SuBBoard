import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Profil from '../components/auth/Profil';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectToken } from '../redux/store';
import { ROUTES } from './routes';

function Router() {
    const token = useAppSelector(selectToken);

    return (
        <BrowserRouter>
            <Profil />
            <Routes>
                {ROUTES.map((newRoute) => {
                    if (newRoute.loggedIn) {
                        if (token.value) {
                            return <Route key={newRoute.path} path={newRoute.path} element={<newRoute.element />} />;
                        }
                        return (
                            <Route
                                key={newRoute.path}
                                path={newRoute.path}
                                element={
                                    <Navigate to={`${process.env.REACT_APP_PUBLIC_URL}`} />
                                }
                            />
                        );
                    }
                    return <Route key={newRoute.path} path={newRoute.path} element={<newRoute.element />} />;
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
