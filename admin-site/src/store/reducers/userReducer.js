// src/store/reducers/userReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";

// ============== Helpers ==============
const getErrorPayload = (err, fallback = "Server Error") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

const findIndexById = (arr, id) => arr.findIndex((u) => u._id === id);

// ============== Core Thunks ==============
export const getAllUsersThunk = createAsyncThunk(
    "user/getAllUsers",
    async (requestURL, { rejectWithValue }) => {
        try {
            const res = await userService.getAllUsers(requestURL);
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const getDetailUserThunk = createAsyncThunk(
    "user/getDetailUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await userService.getDetailUser(id);
            return {
                status: "success",
                message: res?.data?.message || "",
                data: res?.data?.data || res?.data,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const createUserThunk = createAsyncThunk(
    "user/createUser",
    async (requestedData, { rejectWithValue }) => {
        try {
            const res = await userService.createUser(requestedData);
            return {
                status: "success",
                message: res?.data?.message || "Created",
                data: res?.data?.data,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const deleteUserThunk = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await userService.deleteUser(id);
            return {
                status: "success",
                message: res?.data?.message || "Deleted",
                id,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const editDetailUserThunk = createAsyncThunk(
    "user/editDetailUser",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await userService.editDetailUser(id, requestedData);
            return {
                status: "success",
                message: res?.data?.message || "Updated",
                data: res?.data?.data || res?.data,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

// ============== Backward-compatible Wrappers ==============
// Keep your existing component calls unchanged & return { status, message, ... }

export const getAllUsers = (requestURL) => async (dispatch) => {
    try {
        const payload = await dispatch(getAllUsersThunk(requestURL)).unwrap();
        return payload; // { status, data }
    } catch (e) {
        return e; // { status:"failed", message }
    }
};

export const getDetailUser = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(getDetailUserThunk(id)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const createUser = (requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(createUserThunk(requestedData)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deleteUserThunk(id)).unwrap();
        return payload; // { status, message, id }
    } catch (e) {
        return e;
    }
};

export const editDetailUser = (id, requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            editDetailUserThunk({ id, requestedData }),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

// ============== Slice ==============
const initialState = {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    success: false,
    error: null,
    message: { error: "", success: "" },
    users: [],
    detailUser: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllUsers
        builder
            .addCase(getAllUsersThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllUsersThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.users = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllUsersThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // getDetailUser
        builder
            .addCase(getDetailUserThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDetailUserThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "";
                state.detailUser = { ...(action.payload.data || {}) };
            })
            .addCase(getDetailUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // createUser
        builder
            .addCase(createUserThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Created";
                const created = action.payload.data;
                if (created) state.users.unshift(created);
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // deleteUser
        builder
            .addCase(deleteUserThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.users = state.users.filter((u) => u._id !== id);
                    if (state.detailUser?._id === id) state.detailUser = {};
                }
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailUser
        builder
            .addCase(editDetailUserThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailUserThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.users, updated._id);
                    if (idx !== -1)
                        state.users[idx] = { ...state.users[idx], ...updated };
                    if (state.detailUser?._id === updated._id) {
                        state.detailUser = { ...state.detailUser, ...updated };
                    }
                }
            })
            .addCase(editDetailUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });
    },
});

export default userSlice.reducer;
