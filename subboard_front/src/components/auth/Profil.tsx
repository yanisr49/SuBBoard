/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Skeleton } from '@mui/material';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import DelayUnmounting from '../DelayUnmounting';
import { TRANSITION_TIME } from '../../resources/Constants';
import { Select } from '../Select';
import { resetToken } from '../../redux/tokenSlice';
import { changeTheme, updateTheme } from '../../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCurrentUserQuery } from '../../graphql/queries';
import { isThemesKey, themesKeys } from '../../theme';
import { ProfilStyle } from './ProfilStyle';
import { selectTheme, selectToken } from '../../redux/store';

export default function Profil() {
    const [clicked, setClicked] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setClicked(false));

    const token = useAppSelector(selectToken);
    const theme = useAppSelector(selectTheme);

    const style = ProfilStyle(theme.value, clicked);

    const dispatch = useAppDispatch();

    const connectedUser = useQuery(['fetchUser', token.value], fetchCurrentUserQuery, {
        enabled: Boolean(token.value),
        onSuccess: (data) => data?.user?.theme && isThemesKey(data.user.theme) && dispatch(updateTheme(data.user.theme)),
    });

    const logout = () => {
        setClicked(false);
        dispatch(resetToken());
        navigate('/');
    };

    const tokenActif = Boolean(token.value);

    return (
        <div css={style.ProfilContainer} onClick={() => !clicked && setClicked(true)} ref={ref}>
            <Helmet>
                <script src="https://accounts.google.com/gsi/client" async defer />
            </Helmet>

            {tokenActif && (
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
                                referrerPolicy="no-referrer"
                                alt="Profil"
                            />
                        )}
                </div>
            )}

            <div style={{
                width: tokenActif ? '0' : 'auto',
                height: tokenActif ? '0' : 'auto',
                position: 'absolute',
                top: '10px',
                right: '10px',
                overflow: 'hidden',
            }}
            >
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

            <DelayUnmounting delay={TRANSITION_TIME.short} mounted={tokenActif && clicked}>
                <div id="profilContent" css={style.Test}>
                    {!connectedUser.data
                        ? (
                            <Skeleton animation="wave">
                                <Select
                                    id="themes"
                                    label="TODO"
                                    options={[...themesKeys]}
                                    getOptionLabel={(option) => option}
                                    onChange={(option) => { dispatch(changeTheme(option)); }}
                                    initialValue={theme.key}
                                />
                            </Skeleton>
                        )
                        : (
                            <Select
                                id="themes"
                                label="TODO"
                                options={[...themesKeys]}
                                getOptionLabel={(option) => option}
                                onChange={(option) => { dispatch(changeTheme(option)); }}
                                initialValue={theme.key}
                            />
                        ) }
                    <div
                        id="profilContentLogout"
                    >
                        <button
                            onClick={logout}
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </DelayUnmounting>

        </div>
    );
}
