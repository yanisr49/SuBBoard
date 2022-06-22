import { Theme } from '@emotion/react';
import DarkTheme from './DarkTheme';
import LightTheme from './LightTheme';

export type Themes = {
    dark: Theme;
    light: Theme;
}

const themes: Themes = { dark: DarkTheme, light: LightTheme };

export const isThemesKey = (key: string): key is keyof Themes => Object.keys(themes).includes(key);

export default themes;
