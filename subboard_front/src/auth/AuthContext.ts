import { createContext } from 'react';

const AuthContext = createContext<{
    token?: string, updateToken:(token?: string) => void
        }>({ token: undefined, updateToken: () => { } });

export default AuthContext;
