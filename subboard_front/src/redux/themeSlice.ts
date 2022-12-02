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

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<ThemesKeys>) => {
            state.key = action.payload;
            state.value = themes[action.payload];
        },
    },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
