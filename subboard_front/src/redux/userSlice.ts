import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../graphql/generated/graphql';
import { changeThemeMutation } from '../graphql/mutations';
import { getCurrentUserQuery } from '../graphql/queries';
import { RootState } from './store';

export interface UserState {
    user: {
        value: User | null | undefined;
        status: 'idle' | 'loading' | 'failed';
    },
    theme: {
        value: string | null | undefined;
        status: 'idle' | 'loading' | 'failed';
    }
  }

const initialState: UserState = {
    user: { value: undefined, status: 'idle' },
    theme: { value: undefined, status: 'idle' },
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => getCurrentUserQuery(),
);

export const changeTheme = createAsyncThunk(
    'user/changeTheme',
    async (theme: string | undefined) => changeThemeMutation(theme),
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User | undefined | null>) => {
            state.user.value = action.payload;
            state.theme.value = action.payload?.theme;
        },
        updateTheme: (state, action: PayloadAction<string | undefined | null>) => {
            if (state.user.value) {
                state.user.value.theme = action.payload;
            }
            state.theme.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchUser
            .addCase(fetchUser.pending, (state) => {
                state.user.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user.status = 'idle';
                userSlice.caseReducers.updateUser(state, { payload: action.payload.user, type: 'user/updateUser' });
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user.status = 'failed';
            })
            // changeTheme
            .addCase(changeTheme.pending, (state) => {
                state.theme.status = 'loading';
            })
            .addCase(changeTheme.fulfilled, (state, action) => {
                state.theme.status = 'idle';
                userSlice.caseReducers.updateTheme(state, {
                    payload: action.payload?.theme,
                    type: 'user/updateTheme',
                });
            })
            .addCase(changeTheme.rejected, (state) => {
                state.theme.status = 'failed';
            });
    },
});

export const { updateUser, updateTheme } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user.value;
export const selectTheme = (state: RootState) => state.user.theme.value;

export default userSlice.reducer;
