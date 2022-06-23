import { Theme } from '@emotion/react';
import DarkTheme from './DarkTheme';
import LightTheme from './LightTheme';

export const themesKeys = ['dark', 'light'] as const;
export type ThemesKeys = typeof themesKeys[number];

export type Themes = {
    [key in ThemesKeys]: Theme;
}

const themes: Themes = {
    dark: DarkTheme,
    light: LightTheme,
};

export const isThemesKey = (key: string): key is ThemesKeys => Object.keys(themes).includes(key);

export default themes;
