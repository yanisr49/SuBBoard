/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AuthContext from './AuthContext';
import { useOutsideClick } from '../hooks/useOutsideClick';
import DelayUnmounting from '../components/DelayUnmounting';
import { ProfilContainerStyled, ProfilPictureStyled } from './ProfilStyle';
import ThemeContext from '../theme/ThemeContext';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';
import { TRANSITION_TIME } from '../resources/Constants';
import { Select } from '../components/Select';

export default function Profil() {
    const [clicked, setClicked] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const { token, updateToken } = useContext(AuthContext);
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setClicked(false));
    const { theme, toggleTheme } = useContext(ThemeContext);

    const logout = () => {
        updateToken(undefined);
        navigate('/');
    };

    return (
        <div>
            <ProfilContainerStyled clicked={clicked} onClick={() => setClicked(true)} ref={ref}>
                <Helmet>
                    <script src="https://accounts.google.com/gsi/client" async defer />
                </Helmet>

                {token ? (
                    <div className="ProfilPreferences">
                        <ProfilPictureStyled
                            clicked={clicked}
                            id="profilPicture"
                            src=""
                            alt="Profil"
                        />
                    </div>
                ) : (
                    <div>
                        <div
                            id="g_id_onload"
                            data-client_id={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
                            data-login_uri={`${process.env.REACT_APP_API_ENDPOINT}/login`}
                            data-context="signin"
                            data-auto_prompt="false"
                        />
                        <div
                            className="g_id_signin"
                            data-type="standard"
                            data-size="large"
                            data-theme="filled_black"
                            data-shape="circle"
                            data-logo_alignment="left"
                            data-text="signin"
                            data-locale="fr"
                        />

                    </div>
                )}

                <DelayUnmounting delay={TRANSITION_TIME} mounted={!!token && clicked}>
                    <div id="profilContent">
                        <Select
                            id="theme3"
                            checked
                            label="lsdjvb"
                            onChange={() => toggleTheme(LightTheme)}
                        />
                        <div id="profilContentEmail" />
                        <input
                            type="radio"
                            id="theme1"
                            onChange={() => toggleTheme(DarkTheme)}
                            name="theme1"
                            checked={theme === DarkTheme}
                        />
                        <input
                            type="radio"
                            id="theme2"
                            onChange={() => toggleTheme(LightTheme)}
                            name="theme2"
                            checked={theme === LightTheme}
                        />
                        <div id="profilContentLogout">
                            <button onClick={logout} type="button">
                                Logout
                            </button>
                        </div>
                    </div>
                </DelayUnmounting>

            </ProfilContainerStyled>
        </div>
    );
}
