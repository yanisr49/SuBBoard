import { Theme } from '@emotion/react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeThemeMutation } from '../graphql/mutations';
import themes, { isThemesKey, ThemesKeys } from '../theme';

export interface ThemeState {
        key: ThemesKeys;
        value: Theme;
        status: 'idle' | 'loading' | 'failed';
  }

const defaultKey = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initialState: ThemeState = {
    key: defaultKey,
    value: themes[defaultKey],
    status: 'idle',
};

export const changeTheme = createAsyncThunk(
    'user/changeTheme',
    async (theme: ThemesKeys) => changeThemeMutation(theme),
);

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<ThemesKeys>) => {
            state.key = action.payload;
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

export default themeSlice.reducer;
