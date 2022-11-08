import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeThemeMutation } from '../graphql/mutations';
import { isThemesKey, ThemesKeys } from '../theme';

export interface ThemeState {
        value: ThemesKeys;
        status: 'idle' | 'loading' | 'failed';
  }

const initialState: ThemeState = {
    value: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', status: 'idle',
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
            state.value = action.payload;
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
