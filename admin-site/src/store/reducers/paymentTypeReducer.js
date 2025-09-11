import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentTypeService from "../../services/paymentTypeService";

// ============== Helpers ==============
const getErrorPayload = (err, fallback = "Server Error") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

const findIndexById = (arr, id) => arr.findIndex((i) => i._id === id);

// ============== Core Thunks ==============
export const getAllPaymentTypesThunk = createAsyncThunk(
    "paymentType/getAllPaymentTypes",
    async (_, { rejectWithValue }) => {
        try {
            const res = await paymentTypeService.getAllPaymentTypes();
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const deletePaymentTypeThunk = createAsyncThunk(
    "paymentType/deletePaymentType",
    async (id, { rejectWithValue }) => {
        try {
            const res = await paymentTypeService.deletePaymentType(id);
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

export const createPaymentTypeThunk = createAsyncThunk(
    "paymentType/createPaymentType",
    async (requestedData, { rejectWithValue }) => {
        try {
            const res = await paymentTypeService.createPaymentType(
                requestedData,
            );
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

export const getDetailPaymentTypeThunk = createAsyncThunk(
    "paymentType/getDetailPaymentType",
    async (id, { rejectWithValue }) => {
        try {
            const res = await paymentTypeService.getDetailPaymentType(id);
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

export const editDetailPaymentTypeThunk = createAsyncThunk(
    "paymentType/editDetailPaymentType",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await paymentTypeService.editDetailPaymentType(
                id,
                requestedData,
            );
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

export const getAllPaymentTypes = () => async (dispatch) => {
    try {
        const payload = await dispatch(getAllPaymentTypesThunk()).unwrap();
        return payload;
    } catch (e) {
        return e;
    }
};

export const deletePaymentType = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deletePaymentTypeThunk(id)).unwrap();
        return payload; // { status, message, id }
    } catch (e) {
        return e;
    }
};

export const createPaymentType = (requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            createPaymentTypeThunk(requestedData),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const getDetailPaymentType = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(getDetailPaymentTypeThunk(id)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const editDetailPaymentType =
    (id, requestedData) => async (dispatch) => {
        try {
            const payload = await dispatch(
                editDetailPaymentTypeThunk({ id, requestedData }),
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
    paymentTypes: [],
    detailPaymentType: {},
};

export const paymentTypeSlice = createSlice({
    name: "paymentType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllPaymentTypes
        builder
            .addCase(getAllPaymentTypesThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllPaymentTypesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.paymentTypes = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllPaymentTypesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // deletePaymentType
        builder
            .addCase(deletePaymentTypeThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePaymentTypeThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.paymentTypes = state.paymentTypes.filter(
                        (p) => p._id !== id,
                    );
                    if (state.detailPaymentType?._id === id)
                        state.detailPaymentType = {};
                }
            })
            .addCase(deletePaymentTypeThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // createPaymentType
        builder
            .addCase(createPaymentTypeThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPaymentTypeThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Created";
                const created = action.payload.data;
                if (created) state.paymentTypes.unshift(created);
            })
            .addCase(createPaymentTypeThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // getDetailPaymentType
        builder
            .addCase(getDetailPaymentTypeThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDetailPaymentTypeThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "";
                state.detailPaymentType = { ...(action.payload.data || {}) };
            })
            .addCase(getDetailPaymentTypeThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailPaymentType
        builder
            .addCase(editDetailPaymentTypeThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailPaymentTypeThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.paymentTypes, updated._id);
                    if (idx !== -1)
                        state.paymentTypes[idx] = {
                            ...state.paymentTypes[idx],
                            ...updated,
                        };
                    if (state.detailPaymentType?._id === updated._id) {
                        state.detailPaymentType = {
                            ...state.detailPaymentType,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(editDetailPaymentTypeThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });
    },
});

export default paymentTypeSlice.reducer;
