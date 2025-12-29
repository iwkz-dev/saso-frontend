import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "../../services/menuService";

// ============== Helpers ==============
const getErrorPayload = (err, fallback = "Server Error") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

const findIndexById = (arr, id) => arr.findIndex((m) => m._id === id);

// ============== Thunks ==============
export const getAllMenusThunk = createAsyncThunk(
    "menu/getAllMenus",
    async (requestURL, { rejectWithValue }) => {
        try {
            const res = await menuService.getAllMenus(requestURL);
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const getDetailMenuThunk = createAsyncThunk(
    "menu/getDetailMenu",
    async (id, { rejectWithValue }) => {
        try {
            const res = await menuService.getDetailMenu(id);
            return {
                status: "success",
                data: res?.data?.data || res?.data,
                message: res?.data?.message || "",
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const editDetailMenuThunk = createAsyncThunk(
    "menu/editDetailMenu",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await menuService.editDetailMenu(id, requestedData);
            return {
                status: "success",
                data: res?.data?.data || res?.data,
                message: res?.data?.message || "Updated",
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const editDetailMenuImagesThunk = createAsyncThunk(
    "menu/editDetailMenuImages",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await menuService.editDetailMenuImages(
                id,
                requestedData,
            );
            return {
                status: "success",
                data: res?.data?.data || res?.data,
                message: res?.data?.message || "Images updated",
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const createMenuThunk = createAsyncThunk(
    "menu/createMenu",
    async (requestedData, { rejectWithValue }) => {
        try {
            const res = await menuService.createMenu(requestedData);
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

export const deleteMenuThunk = createAsyncThunk(
    "menu/deleteMenu",
    async (id, { rejectWithValue }) => {
        try {
            const res = await menuService.deleteMenu(id);
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

export const bulkCreateMenusThunk = createAsyncThunk(
    "menu/bulkCreateMenus",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await menuService.bulkCreateMenus(payload);
            return {
                status: "success",
                data: res?.data?.data || [],
                count: res?.data?.count || 0,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

// ============== Backward-compatible wrappers ==============

export const getAllMenus = (requestURL) => async (dispatch) => {
    try {
        const payload = await dispatch(getAllMenusThunk(requestURL)).unwrap();
        return payload; // { status, data }
    } catch (e) {
        return e; // { status: "failed", message }
    }
};

export const getDetailMenu = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(getDetailMenuThunk(id)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

// keep signature: dispatch(editDetailMenu(id, data))
export const editDetailMenu = (id, requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            editDetailMenuThunk({ id, requestedData }),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const editDetailMenuImages = (id, requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            editDetailMenuImagesThunk({ id, requestedData }),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const createMenu = (requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(createMenuThunk(requestedData)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const deleteMenu = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deleteMenuThunk(id)).unwrap();
        return payload; // { status, message, id }
    } catch (e) {
        return e;
    }
};

export const bulkCreateMenus = (payload) => async (dispatch) => {
    try {
        const result = await dispatch(bulkCreateMenusThunk(payload)).unwrap();
        return result; // { status, data, count }
    } catch (e) {
        return e; // { status: "failed", message }
    }
};

// ============== Slice ==============
const initialState = {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    success: false,
    error: null,
    message: { error: "", success: "" },
    menus: [],
    detailMenu: {},
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllMenus
        builder
            .addCase(getAllMenusThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllMenusThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.menus = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllMenusThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // getDetailMenu
        builder
            .addCase(getDetailMenuThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDetailMenuThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "";
                state.detailMenu = { ...(action.payload.data || {}) };
            })
            .addCase(getDetailMenuThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailMenu
        builder
            .addCase(editDetailMenuThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailMenuThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.menus, updated._id);
                    if (idx !== -1)
                        state.menus[idx] = { ...state.menus[idx], ...updated };
                    if (state.detailMenu?._id === updated._id) {
                        state.detailMenu = { ...state.detailMenu, ...updated };
                    }
                }
            })
            .addCase(editDetailMenuThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailMenuImages
        builder
            .addCase(editDetailMenuImagesThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailMenuImagesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success =
                    action.payload.message || "Images updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.menus, updated._id);
                    if (idx !== -1)
                        state.menus[idx] = { ...state.menus[idx], ...updated };
                    if (state.detailMenu?._id === updated._id) {
                        state.detailMenu = { ...state.detailMenu, ...updated };
                    }
                }
            })
            .addCase(editDetailMenuImagesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // createMenu
        builder
            .addCase(createMenuThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createMenuThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Created";
                const created = action.payload.data;
                if (created) state.menus.unshift(created);
            })
            .addCase(createMenuThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // deleteMenu
        builder
            .addCase(deleteMenuThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteMenuThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.menus = state.menus.filter((m) => m._id !== id);
                    if (state.detailMenu?._id === id) state.detailMenu = {};
                }
            })
            .addCase(deleteMenuThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // bulkCreateMenus
        builder
            .addCase(bulkCreateMenusThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(bulkCreateMenusThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                const { data, count } = action.payload;
                state.message.success = `${count} menu(s) created successfully`;

                if (Array.isArray(data) && data.length) {
                    // Add created menus to the existing list
                    state.menus = [...data, ...state.menus];
                }
            })
            .addCase(bulkCreateMenusThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Failed to create menus";
                state.error = msg;
                state.message.error = msg;
            });
    },
});

export default menuSlice.reducer;
