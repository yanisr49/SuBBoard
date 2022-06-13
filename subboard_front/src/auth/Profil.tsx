/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthContext from './AuthContext';

// background-color: ${(props) => (props.theme.color === 'dark' ? COLORS.DARK_1 : COLORS.LIGHT_1)};

export default function Profil() {
  const navigate = useNavigate();
  const { credentials, updateCredentials } = useContext(AuthContext);

  // TODO : utiliser la photo de profil de l'utilisateur

  /*
  const style = document.createElement('style');
  React.useEffect(() => {
    style.innerHTML = `
      #credential_picker_container {
        display: ${credentials ? 'none' : 'block'};
      }
    `;
  }, [credentials]);
  */

  const logout = () => {
    updateCredentials(undefined);
    navigate('/');
  };

  return (
    <div id="profil">
      <Helmet>
        <script src="https://accounts.google.com/gsi/client" async defer />
      </Helmet>
      {credentials?.picture && <img src={credentials.picture} alt="Profil" style={{ width: '50px', height: '50px', borderRadius: '25px' }} />}
      {credentials && <div onClick={logout}>logout</div>}
      <div style={{ display: credentials ? 'none' : 'block' }}>
        <div
          id="g_id_onload"
          data-client_id={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
          data-login_uri="http://localhost:4001/login"
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
    </div>
  );
}
