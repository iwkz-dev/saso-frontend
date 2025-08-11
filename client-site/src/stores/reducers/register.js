import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { setToken } from "../../helpers/authHelper";

const initialState = {
    user: null,
    auth: null,
    status: "idle",
    message: null,
    error: null,
};

export const submitRegister = createAsyncThunk(
    "register/submitRegister",
    async (form, { rejectWithValue }) => {
        try {
            const res = await authService.register(form);
            const payload = res?.data ?? res;
            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(payload?.message || "Registration failed");
            }

            const accessToken =
                payload?.data?.accessToken ?? payload?.accessToken ?? null;
            const id = payload?.data?._id ?? payload?.data?.id ?? payload?.id ?? null;
            const user = payload?.data?.user ?? {
                fullname: form.fullname,
                email: form.email,
                phone: form.phone,
            };

            let auth = null;
            if (accessToken && id) {
                auth = { accessToken, id };
                setToken(auth); // auto-login
            }

            return {
                message: payload?.message ?? "Registration success",
                user,
                auth,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        clearRegisterMessage: (state) => {
            state.message = null;
            state.error = null;
        },
        resetRegisterState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitRegister.pending, (state) => {
                state.status = "loading";
                state.message = null;
                state.error = null;
            })
            .addCase(submitRegister.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.auth = action.payload.auth;
            })
            .addCase(submitRegister.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Registration failed";
            });
    },
});

export const { clearRegisterMessage, resetRegisterState } = registerSlice.actions;

// Selectors
export const selectRegisterState = (s) => s.register;
export const selectRegisterStatus = (s) => s.register.status;
export const selectRegisterMessage = (s) => s.register.message;
export const selectRegisterError = (s) => s.register.error;

export default registerSlice.reducer;
