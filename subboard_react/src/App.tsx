import React, {useEffect} from 'react';
import './App.css';
import {gql, useQuery} from '@apollo/client';

function App() {
    const GET_LOCATIONS = gql`
        query Test {
            user {
                id
                email
                pseudo
                theme
                profilPicture
                subscriptions {
                    id
                    name
                    logo
                    color
                }
            }
        }
    `;

    const {loading, error, data} = useQuery(GET_LOCATIONS);

    // const login = useGoogleLogin({
    //     onSuccess: codeResponse => console.log(codeResponse),
    //     flow: 'auth-code',
    //     redirect_uri: "http://localhost:8080/login"
    // });

    useEffect(() => {
        const head = document.querySelector("head");
        const script = document.createElement("script");

        script.setAttribute("src", "https://accounts.google.com/gsi/client");
        //script.setAttribute("async", "true");
        head?.appendChild(script);

        return () => {
            head?.removeChild(script);
        };
    }, []);


    return (
        <div>
            <h1>Test</h1>

            {/*<button onClick={() => login()}>*/}
            {/*    Se connecter*/}
            {/*</button>*/}
            {/*<GoogleLogin*/}
            {/*    onSuccess={(credentialResponse) => {*/}
            {/*        console.log(credentialResponse);*/}
            {/*    }}*/}
            {/*    onError={() => {*/}
            {/*        console.log('Login Failed');*/}
            {/*    }}*/}
            {/*    login_uri="http://localhost:8080/login"*/}
            {/*/>*/}
            <div id="g_id_onload"
                 data-client_id="454692990507-f6olq7d96notita9tstvnrl6el61jdu5.apps.googleusercontent.com"
                 data-context="signin"
                 data-ux_mode="redirect"
                 data-login_uri="http://localhost:8080/login"
                 data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                 data-type="standard"
                 data-shape="pill"
                 data-theme="filled_black"
                 data-text="signin_with"
                 data-size="large"
                 data-logo_alignment="left">
            </div>

            <div>{JSON.stringify(data)}</div>
        </div>

    );
}

export default App;
