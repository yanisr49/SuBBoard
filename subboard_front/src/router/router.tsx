import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Profil from '../components/auth/Profil';
import { useAppSelector } from '../redux/reduxHooks';
import { selectUser } from '../redux/store';
import { ROUTES } from './routes';

function Router() {
    const user = useAppSelector(selectUser);
    console.log(user);

    return (
        <BrowserRouter>
            <Profil />
            <Routes>
                {Object.keys(ROUTES).map((routeIndex) => {
                    const newRoute = ROUTES[routeIndex];
                    if (newRoute.loggedIn) {
                        if (user.user && user.status === 'idle') {
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
