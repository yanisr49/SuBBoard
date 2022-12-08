/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme, selectUser } from '../../redux/store';
import ROUTES_PATHS from '../../router/RoutesPath';
import { WelcomePageStyle } from './WelcomePageStyle';

export default function WelcomePage() {
    const theme = useAppSelector(selectTheme).value;
    const user = useAppSelector(selectUser);
    const style = WelcomePageStyle(theme);
    const navigate = useNavigate();

    return (
        <div css={style.WelcomePage}>
            {!user.user ? <div className="welcome">Welcome</div>
                : (
                    <>
                        <div
                            className="welcomeButton"
                            onClick={() => navigate(ROUTES_PATHS.subscriptions)}
                            onKeyDown={(ev) => ev.key === 'Enter' && navigate(ROUTES_PATHS.subscriptions)}
                            role="button"
                            tabIndex={0}
                        >
                            SuBBoard
                            <p>(WIP)</p>
                        </div>
                        <div
                            className="welcomeButton"
                            onClick={() => navigate(ROUTES_PATHS.workFromHome)}
                            onKeyDown={(ev) => ev.key === 'Enter' && navigate(ROUTES_PATHS.workFromHome)}
                            role="button"
                            tabIndex={0}
                        >
                            Télétravail
                        </div>
                    </>
                )}
        </div>
    );
}
