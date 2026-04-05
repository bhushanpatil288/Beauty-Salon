import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../../api/api";
import type { User } from "../../types";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
};

/**
 * @desc Async thunk used extensively to initialize/check active sessions when the React application loads.
 * Dispatches a backend API call to fetch active user based on JWT presence.
 */
export const initAuth = createAsyncThunk("auth/initAuth", async (_, { rejectWithValue }) => {
    try {
        const res = await fetchUser();
        return (res.data.data ?? res.data.user ?? res.data) as User;
    } catch {
        return rejectWithValue(null);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(initAuth.rejected, (state) => {
                state.user = null;
                state.loading = false;
            });
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
