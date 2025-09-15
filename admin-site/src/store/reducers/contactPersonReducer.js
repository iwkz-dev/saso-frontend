import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactPersonService from "../../services/contactPersonService";

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
export const getAllContactPersonThunk = createAsyncThunk(
    "contactPerson/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await contactPersonService.getAllContactPerson();
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const deleteContactPersonThunk = createAsyncThunk(
    "contactPerson/delete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await contactPersonService.deleteContactPerson(id);
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

export const createContactPersonThunk = createAsyncThunk(
    "contactPerson/create",
    async (requestedData, { rejectWithValue }) => {
        try {
            const res = await contactPersonService.createContactPerson(
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

export const getDetailContactPersonThunk = createAsyncThunk(
    "contactPerson/detail",
    async (id, { rejectWithValue }) => {
        try {
            const res = await contactPersonService.getDetailContactPerson(id);
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

export const editDetailContactPersonThunk = createAsyncThunk(
    "contactPerson/edit",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await contactPersonService.editDetailContactPerson(
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

export const getAllContactPerson = () => async (dispatch) => {
    try {
        const payload = await dispatch(getAllContactPersonThunk()).unwrap();
        return payload;
    } catch (e) {
        return e;
    }
};

export const deleteContactPerson = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deleteContactPersonThunk(id)).unwrap();
        return payload;
    } catch (e) {
        return e;
    }
};

export const createContactPerson = (requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            createContactPersonThunk(requestedData),
        ).unwrap();
        return payload;
    } catch (e) {
        return e;
    }
};

export const getDetailContactPerson = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(
            getDetailContactPersonThunk(id),
        ).unwrap();
        return payload;
    } catch (e) {
        return e;
    }
};

export const editDetailContactPerson =
    (id, requestedData) => async (dispatch) => {
        try {
            const payload = await dispatch(
                editDetailContactPersonThunk({ id, requestedData }),
            ).unwrap();
            return payload;
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
    contactPerson: [],
    detailContactPerson: {},
};

const contactPersonSlice = createSlice({
    name: "contactPerson",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get all
        builder
            .addCase(getAllContactPersonThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllContactPersonThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.contactPerson = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllContactPersonThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // delete
        builder
            .addCase(deleteContactPersonThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteContactPersonThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.contactPerson = state.contactPerson.filter(
                        (p) => p._id !== id,
                    );
                    if (state.detailContactPerson?._id === id) {
                        state.detailContactPerson = {};
                    }
                }
            })
            .addCase(deleteContactPersonThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // create
        builder
            .addCase(createContactPersonThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createContactPersonThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Created";
                const created = action.payload.data;
                if (created) state.contactPerson.unshift(created);
            })
            .addCase(createContactPersonThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // get detail
        builder
            .addCase(getDetailContactPersonThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDetailContactPersonThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "";
                state.detailContactPerson = { ...(action.payload.data || {}) };
            })
            .addCase(getDetailContactPersonThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // edit
        builder
            .addCase(editDetailContactPersonThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                editDetailContactPersonThunk.fulfilled,
                (state, action) => {
                    state.status = "succeeded";
                    state.success = true;
                    state.message.success = action.payload.message || "Updated";
                    const updated = action.payload.data;
                    if (updated?._id) {
                        const idx = findIndexById(
                            state.contactPerson,
                            updated._id,
                        );
                        if (idx !== -1) {
                            state.contactPerson[idx] = {
                                ...state.contactPerson[idx],
                                ...updated,
                            };
                        }
                        if (state.detailContactPerson?._id === updated._id) {
                            state.detailContactPerson = {
                                ...state.detailContactPerson,
                                ...updated,
                            };
                        }
                    }
                },
            )
            .addCase(editDetailContactPersonThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });
    },
});

export default contactPersonSlice.reducer;
