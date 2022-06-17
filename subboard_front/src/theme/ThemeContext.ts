import { Theme } from '@emotion/react';
import { createContext } from 'react';
import DarkTheme from './DarkTheme';

interface ThemeContext {
    theme: Theme;
    toggleTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContext>({ theme: DarkTheme, toggleTheme: () => { } });

export default ThemeContext;
