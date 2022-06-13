import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AuthContext from './AuthContext';
import Credentials from './Credentials';

export default function Auth() {
  const navigate = useNavigate();
  const { token } = useParams<{token: string}>();
  const { updateCredentials } = useContext(AuthContext);

  React.useEffect(() => {
    if (token) {
      const credentials: Credentials = jwtDecode(token);
      credentials.token = token;
      updateCredentials(credentials);
    }
    // TODO : Gérer le cas où le token n'est pas valide ou n'existe pas
    navigate('/subscriptions');
  }, [token, updateCredentials]);

  return (
    <div>
      En chargement...
    </div>
  );
}
