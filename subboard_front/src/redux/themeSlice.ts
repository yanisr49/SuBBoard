import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '@emotion/react';
import { changeThemeMutation } from '../graphql/mutations';
import { RootState } from './store';
import themes, { Themes, isThemesKey } from '../theme';

export interface ThemeState {
        value: Theme;
        status: 'idle' | 'loading' | 'failed';
  }

const initialState: ThemeState = {
    value: window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light, status: 'idle',
};

export const changeTheme = createAsyncThunk(
    'user/changeTheme',
    async (theme: keyof Themes) => changeThemeMutation(theme),
);

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<keyof Themes>) => {
            state.value = themes[action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            // changeTheme
            .addCase(changeTheme.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changeTheme.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.theme && isThemesKey(action.payload.theme)) {
                    themeSlice.caseReducers.updateTheme(state, {
                        payload: action.payload.theme,
                        type: 'user/updateTheme',
                    });
                }
            })
            .addCase(changeTheme.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { updateTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
