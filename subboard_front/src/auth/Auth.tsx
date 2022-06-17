import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AuthContext from './AuthContext';
import { useUserQuery } from '../graphql/generated/graphql';
import { graphQLClient } from '../graphql/graphqlRequest';

export default function Auth() {
    const navigate = useNavigate();
    const { newToken } = useParams<{newToken: string}>();
    const { token, updateToken } = useContext(AuthContext);
    const { data, isLoading } = useUserQuery(graphQLClient);

    console.log(data);

    React.useEffect(() => {
        if (newToken) {
            // const credentials: Credentials = jwtDecode(token);
            // credentials.token = token;
            updateToken(newToken);
        }
        // TODO : Gérer le cas où le token n'est pas valide ou n'existe pas
        navigate('/subscriptions');
    }, [isLoading]);

    return (
        <div>
            En chargement...
        </div>
    );
}
