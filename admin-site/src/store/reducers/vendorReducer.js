// src/store/reducers/vendorReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorService from "../../services/vendorService";

// ============== Helpers ==============
const getErrorPayload = (err, fallback = "Server Error") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

const findIndexById = (arr, id) => arr.findIndex((v) => v._id === id);

// ============== Core Thunks ==============
export const getAllVendorsThunk = createAsyncThunk(
    "vendor/getAllVendors",
    async (_, { rejectWithValue }) => {
        try {
            const res = await vendorService.getAllVendors();
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const deleteVendorThunk = createAsyncThunk(
    "vendor/deleteVendor",
    async (id, { rejectWithValue }) => {
        try {
            const res = await vendorService.deleteVendor(id);
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

export const createVendorThunk = createAsyncThunk(
    "vendor/createVendor",
    async (requestedData, { rejectWithValue }) => {
        try {
            const res = await vendorService.createVendor(requestedData);
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

export const getDetailVendorThunk = createAsyncThunk(
    "vendor/getDetailVendor",
    async (id, { rejectWithValue }) => {
        try {
            const res = await vendorService.getDetailVendor(id);
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

export const editDetailVendorThunk = createAsyncThunk(
    "vendor/editDetailVendor",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await vendorService.editDetailVendor(id, requestedData);
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

// ============== Backward-compatible wrappers ==============
// Keep your current dispatch calls + return the same shape.

export const getAllVendors = () => async (dispatch) => {
    try {
        const payload = await dispatch(getAllVendorsThunk()).unwrap();
        return payload; // { status, data }
    } catch (e) {
        return e; // { status:"failed", message }
    }
};

export const deleteVendor = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deleteVendorThunk(id)).unwrap();
        return payload; // { status, message, id }
    } catch (e) {
        return e;
    }
};

export const createVendor = (requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            createVendorThunk(requestedData),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const getDetailVendor = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(getDetailVendorThunk(id)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const editDetailVendor = (id, requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            editDetailVendorThunk({ id, requestedData }),
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
    vendors: [],
    detailVendor: {},
};

export const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllVendors
        builder
            .addCase(getAllVendorsThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllVendorsThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.vendors = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllVendorsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // deleteVendor
        builder
            .addCase(deleteVendorThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteVendorThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.vendors = state.vendors.filter((v) => v._id !== id);
                    if (state.detailVendor?._id === id) state.detailVendor = {};
                }
            })
            .addCase(deleteVendorThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // createVendor
        builder
            .addCase(createVendorThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createVendorThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Created";
                const created = action.payload.data;
                if (created) state.vendors.unshift(created);
            })
            .addCase(createVendorThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // getDetailVendor
        builder
            .addCase(getDetailVendorThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDetailVendorThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "";
                state.detailVendor = { ...(action.payload.data || {}) };
            })
            .addCase(getDetailVendorThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailVendor
        builder
            .addCase(editDetailVendorThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailVendorThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.vendors, updated._id);
                    if (idx !== -1)
                        state.vendors[idx] = {
                            ...state.vendors[idx],
                            ...updated,
                        };
                    if (state.detailVendor?._id === updated._id) {
                        state.detailVendor = {
                            ...state.detailVendor,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(editDetailVendorThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });
    },
});

export default vendorSlice.reducer;
