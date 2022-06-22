import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { updateToken } from '../redux/tokenSlice';

export default function Auth() {
    const navigate = useNavigate();
    const { newToken } = useParams<{newToken: string}>();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(updateToken(newToken));
        navigate('/subscriptions');
    }, []);

    return (
        <div>
            En chargement...
        </div>
    );
}
