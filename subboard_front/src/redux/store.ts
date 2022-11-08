import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import tokenReducer from './tokenSlice';

export const store = configureStore({
    reducer: {
        token: tokenReducer,
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

export const selectTheme = (state: RootState) => state.theme;
export const selectToken = (state: RootState) => state.token;
