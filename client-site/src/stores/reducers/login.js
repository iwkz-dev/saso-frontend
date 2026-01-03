import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../../services/authService";
import { setToken, removeToken } from "../../helpers/authHelper";

const initialState = {
    user: null,
    auth: null,
    isLogin: false,
    status: "idle",
    message: null,
    error: null,
};

export const submitLogin = createAsyncThunk(
    "login/submitLogin",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await authService.login(credentials);
            const payload = res?.data ?? res; // normalize
            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(payload?.message || "Login failed");
            }

            const accessToken =
                payload?.data?.accessToken ?? payload?.accessToken ?? null;
            const id = payload?.data?.id ?? payload?.id ?? null;
            const user = payload?.data?.user ?? null;

            const auth = { accessToken, id };
            setToken(auth);

            return {
                message: payload?.message ?? "Login success",
                auth,
                user,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        }
    },
);

export const logout = createAsyncThunk("login/logout", async () => {
    try {
        if (typeof removeToken === "function") removeToken();
        else setToken(null);
    } catch (_) {
        console.error("Logout failed");
    }
    return true;
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        clearLoginMessage: (state) => {
            state.message = null;
            state.error = null;
        },
        resetLoginState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(submitLogin.pending, (state) => {
                state.status = "loading";
                state.message = null;
                state.error = null;
            })
            .addCase(submitLogin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLogin = true;
                state.auth = action.payload.auth;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(submitLogin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Login failed";
                state.isLogin = false;
                state.auth = null;
            })

            // logout
            .addCase(logout.fulfilled, () => initialState);
    },
});

export const { clearLoginMessage, resetLoginState } = loginSlice.actions;

export const selectLoginState = (s) => s.login;
export const selectIsLogin = (s) => s.login.isLogin;
export const selectLoginUser = (s) => s.login.user;
export const selectLoginAuth = (s) => s.login.auth;
export const selectLoginStatus = (s) => s.login.status;
export const selectLoginMessage = (s) => s.login.message;
export const selectLoginError = (s) => s.login.error;

export default loginSlice.reducer;
