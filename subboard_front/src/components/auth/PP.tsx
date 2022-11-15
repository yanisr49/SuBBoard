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
import { Select } from '../Select';
import { resetToken } from '../../redux/tokenSlice';
import { changeTheme, updateTheme } from '../../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCurrentUserQuery } from '../../graphql/queries';
import { isThemesKey, themesKeys } from '../../theme';
import { ProfilStyle } from './ProfilStyle';
import { selectTheme, selectToken } from '../../redux/store';

interface Props {
    profilPicture: string;
    email: string;
    expended: boolean;
    loading: boolean;
    onLogOut: () => void;
}

export default function PP({ profilPicture, email, expended, loading, onLogOut } : Props) {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    const style = ProfilStyle(theme.value, true, expended);

    return (
        <div>
            <div
                css={style.PPContainer}
            >
                <img
                    css={style.ProfilPicture}
                    src={profilPicture}
                    referrerPolicy="no-referrer"
                    alt="Profil"
                />
                <p>{email}</p>
            </div>
            <div
                css={style.Preferences}
            >
                <Select
                    id="themes"
                    label="TODO"
                    options={[...themesKeys]}
                    getOptionLabel={(option) => option}
                    onChange={(option) => { dispatch(changeTheme(option)); }}
                    initialValue={theme.key}
                />
                <button
                    css={style.logoutButton}
                    onClick={onLogOut}
                    type="button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
