/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme, selectToken } from '../../redux/store';
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
                        <div className="welcomeButton">
                            WIP
                            <p>(SuBBoard)</p>
                        </div>
                        <div
                            className="welcomeButton"
                            onClick={() => navigate('/teletravail')}
                            onKeyDown={(ev) => ev.key === 'Enter' && navigate('/')}
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
