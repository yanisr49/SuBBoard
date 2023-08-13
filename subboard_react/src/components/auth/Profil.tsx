/** @jsxImportSource @emotion/react */
import React, { useRef, useLayoutEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { ProfilStyle } from './ProfilStyle';
import { selectTheme, selectUser } from '../../redux/store';
import PP from './PP';
import { TRANSITION_TIME } from '../../resources/Constants';
import useDelayedState from '../../resources/hooks/useDelayedState';
import { User } from '../../graphql/generated/graphql';
import { updateStatus, updateUser } from '../../redux/userSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

interface Credentials {
    clientId: string,
    client_id: string,
    credential: string,
    select_by: string
}

export default function Profil() {
    const [expended, setExpended] = useState<boolean>(false);
    const [expendedDelayed, setExpendedDelayed] = useDelayedState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

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
                    setExpended(false);
                    setExpendedDelayed(true, false, TRANSITION_TIME.medium);
                }
            };
            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick);
            };
        },
        [expended],
    );

    const user = useAppSelector(selectUser);
    const loggedIn = Boolean(user.user && user.status === 'idle');
    const loggining = Boolean(user.status === 'loading');

    const theme = useAppSelector(selectTheme);

    const style = ProfilStyle(theme.value, expended, loggedIn, expendedDelayed, loggining);

    const login = useMutation(['login'], (response: Credentials) => fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            credential: response.credential,
        }),
    }), {
        onMutate: () => dispatch(updateStatus('loading')),
        onSuccess: (data) => {
            data.json().then((res) => dispatch(updateUser(res.user as User)));
        },
    });

    const logout = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/logout`, {
            method: 'GET',
            credentials: 'include',
        });

        if (google?.accounts) {
            google.accounts.id.disableAutoSelect();
        }

        setExpended(false);
        setExpendedDelayed(true, false, TRANSITION_TIME.medium);
        dispatch(updateUser(undefined));
    };

    function loadGoogleButton(nthTry: number) { // if you need any param
        // if google is loaded
        if (typeof google !== 'undefined' && document.getElementById('buttonDiv')) {
            try {
                if (!loggedIn && google.accounts) {
                    google.accounts.id.initialize({
                        client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                        callback: (response: Credentials) => login.mutate(response),
                        auto_select: true,
                        cancel_on_tap_outside: false,
                    // skip_prompt_cookie: 'access_token',
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
                        },
                    );
                // google.accounts.id.prompt();
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        } else if (nthTry < 5) {
            setTimeout(() => { loadGoogleButton(nthTry + 1); }, 100);
        } else if (nthTry >= 5) {
            // eslint-disable-next-line no-console
            console.error('Failed to load google signin button');
        }
    }

    useLayoutEffect(() => {
        loadGoogleButton(0);
    }, [user]);

    const handleClick = () => {
        if (!expended) {
            setExpended(true);
            setExpendedDelayed(false, true, TRANSITION_TIME.medium);
        }
    };

    const handleKeyDown = (e?: React.KeyboardEvent<HTMLDivElement>) => {
        if (e?.key === 'Escape' && expended) {
            setExpended(false);
            setExpendedDelayed(true, false, TRANSITION_TIME.medium);
        } else if (e?.key === 'Enter' && !expended) {
            setExpended(true);
            setExpendedDelayed(false, true, TRANSITION_TIME.medium);
        } else if (e?.key === 'Tab' && !e.shiftKey && (e.target as HTMLDivElement).innerText === 'Logout') {
            setExpended(false);
            setExpendedDelayed(true, false, TRANSITION_TIME.medium);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (!expended && e.target === ref.current) {
            setExpended(true);
            setExpendedDelayed(false, true, TRANSITION_TIME.medium);
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
                {loggedIn || loggining ? (
                    <PP
                        loading={loggining}
                        profilPicture={user.user?.profilPicture ?? ''}
                        email={user.user?.email ?? ''}
                        expended={expended}
                        onLogOut={logout}
                    />
                ) : (
                    <div
                        css={style.signInButton}
                        id="buttonDiv"
                    />
                )}
            </div>
        </div>
    );
}
