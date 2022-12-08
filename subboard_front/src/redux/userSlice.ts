import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import cookieParser from 'cookie';
import { User } from '../graphql/generated/graphql';
import { fetchCurrentUserQuery } from '../graphql/queries';

export interface UserState {
  user: User | null | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    user: undefined,
    status: cookieParser.parse(document.cookie).access_token_present === undefined ? 'idle' : 'loading',
};

export const loggin = createAsyncThunk(
    'counter/fetchCount',
    async () => {
        const response = await fetchCurrentUserQuery();
        // The value we return becomes the `fulfilled` action payload
        return response.user;
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loggin.pending, (state) => {
                state.user = undefined;
                state.status = 'loading';
            })
            .addCase(loggin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'idle';
            })
            .addCase(loggin.rejected, (state) => {
                state.user = undefined;
                state.status = 'failed';
            });
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
