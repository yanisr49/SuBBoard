import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from './themeSlice';
import userReducer, { UserState } from './userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectTheme = (state: RootState): ThemeState => state.theme;
export const selectUser = (state: RootState): UserState => state.user;
