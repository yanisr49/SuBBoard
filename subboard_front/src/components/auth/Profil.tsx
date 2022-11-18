/** @jsxImportSource @emotion/react */
import React, { useRef, useLayoutEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { resetToken, updateToken } from '../../redux/tokenSlice';
import { updateTheme } from '../../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCurrentUserQuery } from '../../graphql/queries';
import { isThemesKey } from '../../theme';
import { ProfilStyle } from './ProfilStyle';
import { selectTheme, selectToken } from '../../redux/store';
import PP from './PP';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

interface Credentials {
    clientId: string,
    client_id: string,
    credential: string,
    select_by: string
}

export default function Profil() {
    const [expended, setExpended] = React.useState<boolean>(false);
    const [wasLoggedIn, setWasLoggedIn] = React.useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setExpended(false));

    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);
    const loggedIn = Boolean(token.value);
    const theme = useAppSelector(selectTheme);

    const style = ProfilStyle(theme.value, expended);

    const connectedUser = useQuery(['fetchUser', token.value], fetchCurrentUserQuery, {
        enabled: Boolean(token.value),
        onSuccess: (data) => data?.user?.theme && isThemesKey(data.user.theme) && dispatch(updateTheme(data.user.theme)),

    });

    const login = useMutation(['login'], (response: Credentials) => fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            credential: response.credential,
        }),
    }), {
        onSuccess: (data) => {
            data.json().then((res) => dispatch(updateToken(res.token)));
        },
    });

    const logout = () => {
        setWasLoggedIn(true);
        setExpended(false);
        dispatch(resetToken());
    };

    useLayoutEffect(() => {
        if (!loggedIn && google.accounts) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                callback: (response: Credentials) => login.mutate(response),
                auto_select: true,
            });
            google.accounts.id.renderButton(
                document.getElementById('buttonDiv'),
                {
                    type: 'standard',
                    size: 'large',
                    theme: 'filled_black',
                    shape: 'circle',
                    logo_alignment: 'left',
                    text: 'signin',
                    locale: 'fr',
                }, // customization attributes
            );
            if (!wasLoggedIn) {
                google.accounts.id.prompt(); // also display the One Tap dialog
            }
        }
    }, [loggedIn]);

    return (
        <div
            css={style.ProfilBlurContainer}
        >
            <div
                css={style.ProfilContainer}
                onClick={() => !expended && setExpended(true)}
                onKeyDown={(ev) => ev.key === 'Enter' && !expended && setExpended(true)}
                role="button"
                ref={ref}
                tabIndex={0}
            >
                {loggedIn && (
                    <PP
                        profilPicture={connectedUser.data?.user?.profilPicture ?? ''}
                        email={connectedUser.data?.user?.email ?? ''}
                        expended={expended}
                        onLogOut={logout}
                    />
                )}

                {!loggedIn && (
                    <div css={style.signInButton} id="buttonDiv" />
                )}
            </div>
        </div>
    );
}
