/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/reduxHooks';
import { selectTheme, selectToken } from '../../redux/store';
import ROUTES_PATHS from '../../router/RoutesPath';
import { WelcomePageStyle } from './WelcomePageStyle';

export default function WelcomePage() {
    const theme = useAppSelector(selectTheme).value;
    const token = useAppSelector(selectToken).value;
    const style = WelcomePageStyle(theme);
    const navigate = useNavigate();

    return (
        <div css={style.WelcomePage}>
            {!token ? <div className="welcome">Welcome</div>
                : (
                    <>
                        <div
                            className="welcomeButton"
                            onClick={() => navigate(ROUTES_PATHS.subscriptions)}
                            onKeyDown={(ev) => ev.key === 'Enter' && navigate(ROUTES_PATHS.subscriptions)}
                            role="button"
                            tabIndex={0}
                        >
                            WIP
                            <p>(SuBBoard)</p>
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
