import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "../../services/menuService";

const initialState = {
    data: [],
    menuDetail: null,
    status: "idle",
    detailStatus: "idle",
    error: null,
    successMessage: null,
};

// ============== Thunks ==============

export const fetchMenu = createAsyncThunk(
    "menu/fetchMenu",
    async (filter, { rejectWithValue }) => {
        try {
            const res = await menuService.getMenu(filter);
            if (res.data?.status !== "success") {
                return rejectWithValue(res.data?.message || "Failed to fetch menu");
            }
            return {
                items: res.data?.data?.data ?? [],
                message: res.data?.message ?? null,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

export const fetchMenuById = createAsyncThunk(
    "menu/fetchMenuById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await menuService.getMenuWithId(id);
            if (res.data?.status !== "success") {
                return rejectWithValue(res.data?.message || "Failed to fetch menu detail");
            }
            return {
                detail: res.data?.data ?? null,
                message: res.data?.message ?? null,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

export const fetchMenuByBarcode = createAsyncThunk(
    "menu/fetchMenuByBarcode",
    async (barcode, { rejectWithValue }) => {
        try {
            const res = await menuService.getMenuWithBarcode(barcode);
            if (res.data?.status !== "success") {
                return rejectWithValue(res.data?.message || "Failed to fetch by barcode");
            }
            return {
                detail: res.data?.data ?? null,
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

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        resetMenu: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // --- list ---
            .addCase(fetchMenu.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.items;
                state.successMessage = action.payload.message;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
            })

            // --- detail by id ---
            .addCase(fetchMenuById.pending, (state) => {
                state.detailStatus = "loading";
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchMenuById.fulfilled, (state, action) => {
                state.detailStatus = "succeeded";
                state.menuDetail = action.payload.detail;
                state.successMessage = action.payload.message;
            })
            .addCase(fetchMenuById.rejected, (state, action) => {
                state.detailStatus = "failed";
                state.menuDetail = null;
                state.error = action.payload || "Unknown error";
            })

            // --- detail by barcode ---
            .addCase(fetchMenuByBarcode.pending, (state) => {
                state.detailStatus = "loading";
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchMenuByBarcode.fulfilled, (state, action) => {
                state.detailStatus = "succeeded";
                state.menuDetail = action.payload.detail;
                state.successMessage = action.payload.message;
            })
            .addCase(fetchMenuByBarcode.rejected, (state, action) => {
                state.detailStatus = "failed";
                state.menuDetail = null;
                state.error = action.payload || "Unknown error";
            });
    },
});

export const { resetMenu } = menuSlice.actions;

// ============== Selectors ==============
export const selectMenu = (state) => state.menu.data;
export const selectMenuStatus = (state) => state.menu.status;
export const selectMenuError = (state) => state.menu.error;
export const selectMenuDetail = (state) => state.menu.menuDetail;
export const selectMenuDetailStatus = (state) => state.menu.detailStatus;

export default menuSlice.reducer;
