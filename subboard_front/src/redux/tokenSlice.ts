import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_STORE_NAME } from '../resources/Constants';
import { RootState } from './store';

export interface TokenState {
  value: string | undefined;
}

const initialState: TokenState = {
    value: undefined,
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<string | undefined>) => {
            window.localStorage.setItem(TOKEN_STORE_NAME, action.payload ?? '');
            state.value = action.payload;
        },
    },
});

export const { updateToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token.value;

export default tokenSlice.reducer;
