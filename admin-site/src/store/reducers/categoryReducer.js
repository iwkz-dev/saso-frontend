// src/store/reducers/categoryReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";

// ============== Helpers ==============
const getErrorPayload = (err, fallback = "Server Error") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

const findIndexById = (arr, id) => arr.findIndex((c) => c._id === id);

// ============== Core Thunks ==============
export const getAllCategoriesThunk = createAsyncThunk(
    "category/getAllCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await categoryService.getAllCategories();
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const deleteCategoryThunk = createAsyncThunk(
    "category/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const res = await categoryService.deleteCategory(id);
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

export const createCategoryThunk = createAsyncThunk(
    "category/createCategory",
    async (requestedData, { rejectWithValue }) => {
        try {
            const res = await categoryService.createCategory(requestedData);
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

export const getDetailCategoryThunk = createAsyncThunk(
    "category/getDetailCategory",
    async (id, { rejectWithValue }) => {
        try {
            const res = await categoryService.getDetailCategory(id);
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

export const editDetailCategoryThunk = createAsyncThunk(
    "category/editDetailCategory",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await categoryService.editDetailCategory(
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

// ============== Back-compat Wrappers (same signatures you already use) ==============
export const getAllCategories = () => async (dispatch) => {
    try {
        const payload = await dispatch(getAllCategoriesThunk()).unwrap();
        return payload; // { status, data }
    } catch (e) {
        return e; // { status: "failed", message }
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deleteCategoryThunk(id)).unwrap();
        return payload; // { status, message, id }
    } catch (e) {
        return e;
    }
};

export const createCategory = (requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            createCategoryThunk(requestedData),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const getDetailCategory = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(getDetailCategoryThunk(id)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const editDetailCategory = (id, requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            editDetailCategoryThunk({ id, requestedData }),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

// ============== Slice ==============
const initialState = {
    status: "idle",
    success: false,
    error: null,
    message: { error: "", success: "" },
    categories: [],
    detailCategory: {},
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllCategories
        builder
            .addCase(getAllCategoriesThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.categories = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllCategoriesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // deleteCategory
        builder
            .addCase(deleteCategoryThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.categories = state.categories.filter(
                        (c) => c._id !== id,
                    );
                    if (state.detailCategory?._id === id)
                        state.detailCategory = {};
                }
            })
            .addCase(deleteCategoryThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // createCategory
        builder
            .addCase(createCategoryThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createCategoryThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Created";
                const created = action.payload.data;
                if (created) state.categories.unshift(created);
            })
            .addCase(createCategoryThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // getDetailCategory
        builder
            .addCase(getDetailCategoryThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDetailCategoryThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "";
                state.detailCategory = { ...(action.payload.data || {}) };
            })
            .addCase(getDetailCategoryThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailCategory
        builder
            .addCase(editDetailCategoryThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailCategoryThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.categories, updated._id);
                    if (idx !== -1)
                        state.categories[idx] = {
                            ...state.categories[idx],
                            ...updated,
                        };
                    if (state.detailCategory?._id === updated._id) {
                        state.detailCategory = {
                            ...state.detailCategory,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(editDetailCategoryThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });
    },
});

export default categorySlice.reducer;
