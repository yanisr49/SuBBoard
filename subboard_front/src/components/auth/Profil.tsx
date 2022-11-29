/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useLayoutEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { resetToken, updateToken } from '../../redux/tokenSlice';
import { updateTheme } from '../../redux/themeSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { fetchCurrentUserQuery } from '../../graphql/queries';
import { isThemesKey } from '../../theme';
import { ProfilStyle } from './ProfilStyle';
import { selectTheme, selectToken } from '../../redux/store';
import PP from './PP';
import { QUERY_NAMES, TRANSITION_TIME } from '../../resources/Constants';
import useDelayedState from '../../resources/hooks/useDelayedState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

interface Credentials {
    clientId: string,
    client_id: string,
    credential: string,
    select_by: string
}

export default function Profil() {
    const [expended, expendedDelayed, setExpended] = useDelayedState<boolean>(false);
    const [loggining, setLoggining] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(
        () => {
            const handleClick = (e: MouseEvent) => {
                if (
                    expended
                    && ref.current
                    && !ref.current.contains(e.target as Node)
                    && containerRef.current
                    && containerRef.current !== (e.target as Node)
                ) {
                    setExpended(false, true, TRANSITION_TIME.medium);
                }
            };
            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick);
            };
        },
        [expended],
    );

    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken).value;
    const loggedIn = Boolean(token);
    const theme = useAppSelector(selectTheme);

    const style = ProfilStyle(theme.value, expended, loggedIn, expendedDelayed, loggining);

    const connectedUser = useQuery([QUERY_NAMES.fetchUser, token], fetchCurrentUserQuery, {
        enabled: Boolean(token),
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
        onMutate: () => setLoggining(true),
        onSuccess: (data) => {
            data.json().then((res) => dispatch(updateToken(res.token)));
            setLoggining(false);
        },
    });

    const logout = () => {
        if (google?.accounts) {
            google.accounts.id.disableAutoSelect();
        }

        setExpended(false, true, TRANSITION_TIME.medium);
        dispatch(resetToken());
    };

    useLayoutEffect(() => {
        if (!loggedIn && google?.accounts) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                callback: (response: Credentials) => login.mutate(response),
                auto_select: true,
                cancel_on_tap_outside: false,
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
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
    }, [loggedIn]);

    const handleClick = () => {
        if (!expended) {
            setExpended(true, false, TRANSITION_TIME.medium);
        }
    };

    const handleKeyDown = (e?: React.KeyboardEvent<HTMLDivElement>) => {
        if (e?.key === 'Escape' && expended) {
            setExpended(false, true, TRANSITION_TIME.medium);
        } else if (e?.key === 'Enter' && !expended) {
            setExpended(true, false, TRANSITION_TIME.medium);
        } else if (e?.key === 'Tab' && !e.shiftKey && (e.target as HTMLDivElement).innerText === 'Logout') {
            setExpended(false, true, TRANSITION_TIME.medium);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (!expended && e.target === ref.current) {
            setExpended(true, false, TRANSITION_TIME.medium);
        }
    };

    return (
        <div
            ref={containerRef}
        >
            <div
                css={style.ProfilBlurContainer}
            />
            <div
                css={style.ProfilContainer}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                role="button"
                tabIndex={0}
                ref={ref}
            >
                {loggedIn && (
                    <PP
                        loading={connectedUser.isLoading}
                        profilPicture={connectedUser.data?.user?.profilPicture ?? ''}
                        email={connectedUser.data?.user?.email ?? ''}
                        expended={expended}
                        onLogOut={logout}
                    />
                )}

                {!loggedIn && (
                    <div
                        css={style.signInButton}
                        id="buttonDiv"
                    />
                )}
            </div>
        </div>
    );
}
