import React from 'react';
import './App.scss';
import jwtDecode from 'jwt-decode';
import ThemeContext from './theme/ThemeContext';
import Router from './router';
import Credentials from './auth/Credentials';
import AuthContext from './auth/AuthContext';

function App() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getCredentials = (): Credentials | undefined => {
    const token = window.localStorage.getItem('token');
    return token ? jwtDecode(token) : undefined;
  };

  const [credentials, setCredentials] = React.useState<Credentials | undefined>(getCredentials());
  const authentication = React.useMemo(
    () => ({
      credentials,
      updateCredentials: (newCredentials?: Credentials) => {
        setCredentials(newCredentials);
        if (newCredentials) {
          window.localStorage.setItem('token', newCredentials.token);
        } else if (window.localStorage.getItem('token')) {
          window.localStorage.removeItem('token');
        }
      },
    }),
    [credentials],
  );

  const [themeName, setThemeName] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const themeValue = React.useMemo(
    () => ({
      color: themeName,
      toggleColor: () => setThemeName((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark')),
    }),
    [themeName],
  );

  return (
    <div id="main">
      <AuthContext.Provider value={authentication}>
        <ThemeContext.Provider value={themeValue}>
          <Router />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
