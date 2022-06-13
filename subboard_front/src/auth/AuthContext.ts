import { createContext } from 'react';
import Credentials from './Credentials';

const AuthContext = createContext<{
    credentials?: Credentials, updateCredentials:(credentials?: Credentials) => void
      }>({ credentials: undefined, updateCredentials: () => { } });

export default AuthContext;
