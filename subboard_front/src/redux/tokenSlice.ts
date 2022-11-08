import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_STORE_NAME, TOKEN_EXPIRATION_TIME } from '../resources/Constants';

export interface TokenState {
  value: string | undefined;
  expirationDate: number;
}

const initialState: TokenState = {
    value: window.localStorage.getItem(TOKEN_STORE_NAME) ?? undefined,
    expirationDate: window.localStorage.getItem(TOKEN_STORE_NAME) ? new Date().getTime() + TOKEN_EXPIRATION_TIME : 0,
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<string | undefined>) => {
            window.localStorage.setItem(TOKEN_STORE_NAME, action.payload ?? '');
            state.value = action.payload;
            state.expirationDate = new Date().getTime() + TOKEN_EXPIRATION_TIME;
        },
        resetToken: (state) => {
            window.localStorage.setItem(TOKEN_STORE_NAME, '');
            state.value = undefined;
            state.expirationDate = 0;
        },
    },
});

export const { updateToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
