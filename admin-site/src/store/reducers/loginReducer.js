import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { setToken } from "../../helpers/authHelper";
import Router from "next/router";

/** Normalize backend/axios error into { status, message } */
const getErrorPayload = (err, fallback = "Login failed") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

// ============== Thunks ==============

export const submitLogin = createAsyncThunk(
    "login/submitLogin",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await authService.login(credentials);
            const data = res?.data || {};
            const authData = {
                accessToken: `Bearer ${data.accessToken}`,
                id: data.id,
            };

            // Persist token/session
            setToken(authData);

            Router.push("/");

            return {
                status: "success",
                message: data?.message || "Logged in successfully",
                userId: data?.id || null,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

// ============== Slice ==============

const initialState = {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    data: {
        user: {
            email: "",
            password: "",
        },
        message: {
            error: "",
            success: "",
        },
        isLogin: false,
        userId: null,
    },
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        textFieldChangeHandler: (state, action) => {
            const { name, value } = action.payload;
            state.data.user[name] = value;
        },
        clearLoginMessage: (state) => {
            state.data.message.error = "";
            state.data.message.success = "";
            state.error = null;
        },
        resetLoginState: (state) => {
            state.status = "idle";
            state.error = null;
            state.data.message.error = "";
            state.data.message.success = "";
            state.data.isLogin = false;
            state.data.userId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitLogin.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.data.message.error = "";
                state.data.message.success = "";
            })
            .addCase(submitLogin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.data.isLogin = true;
                state.data.userId = action.payload.userId || null;
                state.data.message.success =
                    action.payload.message || "Logged in";
            })
            .addCase(submitLogin.rejected, (state, action) => {
                state.status = "failed";
                const msg = action.payload?.message || "Login failed";
                state.error = msg;
                state.data.isLogin = false;
                state.data.message.error = msg;
            });
    },
});

export const { textFieldChangeHandler, clearLoginMessage, resetLoginState } =
    loginSlice.actions;

export default loginSlice.reducer;
