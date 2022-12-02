import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/reduxHooks';
import { updateToken } from '../../redux/tokenSlice';

export default function Auth() {
    const navigate = useNavigate();
    const { newToken } = useParams<{newToken: string}>();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(updateToken(newToken));
        navigate('/');
    }, []);

    return (
        <div>
            En chargement...
        </div>
    );
}
