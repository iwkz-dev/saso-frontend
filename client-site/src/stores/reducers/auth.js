import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isCheckingAuth: false,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
    error: null,
    verifyStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

// -------------------- Async Thunks -------------------- //

// Register user
export const submitRegister = createAsyncThunk(
    "auth/submitRegister",
    async (form, { rejectWithValue }) => {
        try {
            const res = await authService.register(form);
            const payload = res.data;

            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(
                    payload?.message || "Registration failed",
                );
            }

            if (payload.token) {
                localStorage.setItem("accessToken", payload.token);
            }

            return {
                user: payload,
                message: res?.message || "Login successful",
                status: res?.status,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        }
    },
);

// Verify email
export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (token, { rejectWithValue }) => {
        try {
            const res = await authService.verifyEmail(token);
            const payload = res.data;

            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(
                    payload?.message || "Verification failed",
                );
            }

            return {
                message: payload?.message || "Email verified successfully",
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        }
    },
);

// Login user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await authService.login(credentials);
            const payload = res;

            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(payload?.message || "Login failed");
            }

            if (payload.data.token) {
                localStorage.setItem("accessToken", payload.data.token);
            }

            return {
                user: payload?.data,
                message: payload?.message || "Login successful",
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        }
    },
);

// Logout user
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
            return { message: "Logged out successfully" };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        } finally {
            localStorage.removeItem("accessToken");
        }
    },
);

// Check auth status
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const res = await authService.checkAuth();
            const payload = res.data;

            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(payload?.message || "Not authenticated");
            }

            return { user: payload?.data };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        }
    },
);

// Request new verification email
export const requestVerifyEmail = createAsyncThunk(
    "auth/requestVerifyEmail",
    async (_, { rejectWithValue }) => {
        try {
            const res = await authService.requestVerifyEmail();
            const payload = res.data;

            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(
                    payload?.message || "Failed to send verification email",
                );
            }

            return { message: payload?.message || "Verification email sent" };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        }
    },
);

// -------------------- Slice -------------------- //

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.status = "idle";
            state.verifyStatus = "idle";
            state.isLoading = false;
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(submitRegister.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
                state.error = null;
            })
            .addCase(submitRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(submitRegister.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                state.error = action.payload;
            });

        // Verify email
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.verifyStatus = "loading";
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.verifyStatus = "succeeded";
                state.message = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.verifyStatus = "failed";
                state.error = action.payload;
            });

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            });

        // Logout
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.message = "Logged out successfully";
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            });

        // Check auth
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isCheckingAuth = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isCheckingAuth = false;
                state.isAuthenticated = false;
                state.user = null;
            });

        // Request verify email
        builder
            .addCase(requestVerifyEmail.pending, (state) => {
                state.verifyStatus = "loading";
                state.error = null;
            })
            .addCase(requestVerifyEmail.fulfilled, (state, action) => {
                state.verifyStatus = "succeeded";
                state.message = action.payload.message;
            })
            .addCase(requestVerifyEmail.rejected, (state, action) => {
                state.verifyStatus = "failed";
                state.error = action.payload;
            });
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
