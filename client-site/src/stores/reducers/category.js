import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";

const initialState = {
    data: [],
    status: "idle",
    error: null,
    successMessage: null,
};

// ============== Thunks ==============

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (filter, { rejectWithValue }) => {
        try {
            const res = await categoryService.getCategory(filter);
            if (res.data?.status !== "success") {
                return rejectWithValue(res.data?.message || "Failed to fetch categories");
            }
            return {
                items: res.data?.data ?? [],
                message: res.data?.message ?? null,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

// ============== Slice ==============

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        resetCategory: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.items;
                state.successMessage = action.payload.message;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
            });
    },
});

export const { resetCategory } = categorySlice.actions;

// ============== Selectors ==============
export const selectCategories = (state) => state.category.data;
export const selectCategoryStatus = (state) => state.category.status;
export const selectCategoryError = (state) => state.category.error;

export default categorySlice.reducer;