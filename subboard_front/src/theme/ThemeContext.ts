import { createContext } from 'react';

const ThemeContext = createContext({ color: 'dark', toggleColor: () => { } });

export default ThemeContext;
