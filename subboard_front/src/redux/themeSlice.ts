import { Theme } from '@emotion/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import themes, { ThemesKeys } from '../theme';

export interface ThemeState {
        key: ThemesKeys;
        value: Theme;
  }

const defaultKey = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initialState: ThemeState = {
    key: defaultKey,
    value: themes[defaultKey],
};
document.getElementsByTagName('html')[0].style.backgroundColor = themes[defaultKey].backgroundColor.ternary;
// document.styleSheets[0].insertRule('::-webkit-scrollbar { width: 17px }', 0);
// document.styleSheets[0].insertRule(`::-webkit-scrollbar-track { background: ${themes[defaultKey].backgroundColor.ternary} }`);
// document.styleSheets[0].insertRule(`::-webkit-scrollbar-thumb { background: ${themes[defaultKey].backgroundColor.secondary} }`);
// document.styleSheets[0].insertRule(`-webkit-scrollbar-thumb:hover { background: ${themes[defaultKey].backgroundColor.primary} }`);

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<ThemesKeys>) => {
            state.key = action.payload;
            state.value = themes[action.payload];
            document.getElementsByTagName('html')[0].style.backgroundColor = themes[action.payload].backgroundColor.ternary;
        },
    },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
