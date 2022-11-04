/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Skeleton } from '@mui/material';
import { useOutsideClick } from '../hooks/useOutsideClick';
import DelayUnmounting from '../components/DelayUnmounting';
import { TRANSITION_TIME } from '../resources/Constants';
import { Select } from '../components/Select';
import { selectToken, updateToken } from '../redux/tokenSlice';
import { selectTheme, updateTheme } from '../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchCurrentUserQuery } from '../graphql/queries';
import themes, { isThemesKey, themesKeys } from '../theme';
import { ProfilStyle } from './ProfilStyle';

export default function Profil() {
    const [clicked, setClicked] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setClicked(false));

    const token = useAppSelector(selectToken);
    const theme = useAppSelector(selectTheme);

    const style = ProfilStyle(themes[theme.value], clicked);

    const dispatch = useAppDispatch();

    const connectedUser = useQuery('fetchUser', fetchCurrentUserQuery, {
        enabled: Boolean(token),
    });

    useEffect(() => {
        if (
            connectedUser.data?.user?.theme
            && isThemesKey(connectedUser.data?.user?.theme)
        ) {
            dispatch(updateTheme(connectedUser.data.user.theme));
        }
    }, [connectedUser.data]);

    const logout = () => {
        dispatch(updateToken(undefined));
        navigate('/');
    };

    console.log(token, connectedUser.data);

    return (
        <div>
            <div css={style.ProfilContainer} onClick={() => setClicked(true)} ref={ref}>
                <Helmet>
                    <script src="https://accounts.google.com/gsi/client" async defer />
                </Helmet>

                {token ? (
                    <div className="ProfilPreferences">
                        {!connectedUser.data
                            ? (
                                <Skeleton
                                    variant="circular"
                                    css={style.ProfilPicture}
                                    animation="wave"
                                >
                                    <img
                                        css={style.ProfilPicture}
                                        id="profilPicture"
                                        src=""
                                        alt="Profil"
                                    />
                                </Skeleton>
                            )
                            : (
                                <img
                                    css={style.ProfilPicture}
                                    id="profilPicture"
                                    src={connectedUser.data?.user?.profilPicture ?? ''}
                                    alt="Profil"
                                />
                            )}
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
                        {!connectedUser.data
                            ? (
                                <Skeleton animation="wave">
                                    <Select
                                        id="themes"
                                        label="TODO"
                                        options={[...themesKeys]}
                                        getOptionLabel={(option) => option}
                                        onChange={(option) => { dispatch(updateTheme(option)); }}
                                        initialValue={theme.value}
                                    />
                                </Skeleton>
                            )
                            : (
                                <Select
                                    id="themes"
                                    label="TODO"
                                    options={[...themesKeys]}
                                    getOptionLabel={(option) => option}
                                    onChange={(option) => { dispatch(updateTheme(option)); }}
                                    initialValue={theme.value}
                                />
                            ) }
                        {/* <div id="profilContentLogout">
                            <button onClick={logout} type="button">
                                Logout
                            </button>
                        </div> */}
                    </div>
                </DelayUnmounting>

            </div>
        </div>
    );
}
