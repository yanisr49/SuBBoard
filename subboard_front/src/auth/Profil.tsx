/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useOutsideClick } from '../hooks/useOutsideClick';
import DelayUnmounting from '../components/DelayUnmounting';
import { ProfilContainerStyled, ProfilPictureStyled } from './ProfilStyle';
import { TRANSITION_TIME } from '../resources/Constants';
import { Select } from '../components/Select';
import { selectToken } from '../redux/tokenSlice';
import {
    changeTheme, fetchUser, selectTheme, updateUser,
} from '../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

export default function Profil() {
    const [clicked, setClicked] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setClicked(false));

    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);
    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        if (token) {
            dispatch(fetchUser());
        } else {
            dispatch(updateUser(undefined));
        }
    }, [token]);

    const logout = () => {
        // updateToken(undefined);
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
                )
                    : (
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
                            onChange={() => dispatch(fetchUser())}
                        />
                        <div id="profilContentEmail" />
                        <input
                            type="radio"
                            id="theme1"
                            onChange={() => dispatch(changeTheme('dark'))}
                            name="theme1"
                            checked={theme === 'dark'}
                        />
                        <input
                            type="radio"
                            id="theme2"
                            onChange={() => dispatch(changeTheme('light'))}
                            name="theme2"
                            checked={theme === 'light'}
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
