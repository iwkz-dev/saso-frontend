import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

// ============== Helpers ==============
const getErrorPayload = (err, fallback = "Server Error") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

const findIndexById = (arr, id) => arr.findIndex((o) => o._id === id);

// ============== Thunks (core) ==============

export const getAllOrdersThunk = createAsyncThunk(
    "order/getAllOrders",
    async (requestURL, { rejectWithValue }) => {
        try {
            const res = await orderService.getAllOrders(requestURL);
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const getOrderByInvoiceNumberThunk = createAsyncThunk(
    "order/getOrderByInvoiceNumber",
    async (invoiceNumber, { rejectWithValue }) => {
        try {
            const res = await orderService.getOrderByInvoiceNumber(
                invoiceNumber,
            );
            return { status: "success", data: res?.data?.data };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const deleteOrderThunk = createAsyncThunk(
    "order/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const res = await orderService.deleteOrder(id);
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

export const changeOrderStatusThunk = createAsyncThunk(
    "order/changeOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const res = await orderService.changeOrderStatus(id, status);
            return {
                status: "success",
                message: res?.data?.message || "Updated",
                data: res?.data?.data, // updated order
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const confirmOrderedMenu = createAsyncThunk(
    "order/confirmOrderedMenu",
    async ({ orderId, vendorId }, { rejectWithValue }) => {
        try {
            const res = await orderService.confirmOrderedMenuStatusByVendors(
                orderId,
                vendorId,
            );
            // normalize shape
            return {
                status: "success",
                message: res?.data?.message || "Ordered menus confirmed.",
                data: res?.data?.data,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

// ============== Thunk wrappers (backward compatible) ==============

export const getAllOrders = (requestURL) => async (dispatch) => {
    try {
        const payload = await dispatch(getAllOrdersThunk(requestURL)).unwrap();
        return payload;
    } catch (e) {
        return e;
    }
};

export const getOrderByInvoiceNumber = (invoiceNumber) => async (dispatch) => {
    try {
        const payload = await dispatch(
            getOrderByInvoiceNumberThunk(invoiceNumber),
        ).unwrap();
        return payload;
    } catch (e) {
        return e;
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deleteOrderThunk(id)).unwrap();
        return payload; // { status, message, id }
    } catch (e) {
        return e;
    }
};

export const changeOrderStatus = (id, status) => async (dispatch) => {
    try {
        const payload = await dispatch(
            changeOrderStatusThunk({ id, status }),
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
    orders: [],
    detailOrder: {},
    confirmedMenus: [],
    loading: false, // kept for backward-compat (used by some UIs)
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ---- getAllOrders
        builder
            .addCase(getAllOrdersThunk.pending, (state) => {
                state.status = "loading";
                state.loading = true;
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.success = true;
                state.orders = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllOrdersThunk.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // ---- getOrderByInvoiceNumber
        builder
            .addCase(getOrderByInvoiceNumberThunk.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(
                getOrderByInvoiceNumberThunk.fulfilled,
                (state, action) => {
                    state.status = "succeeded";
                    state.loading = false;
                    state.success = true;
                    state.detailOrder = action.payload.data || {};
                    state.message.success = "Loaded";
                },
            )
            .addCase(getOrderByInvoiceNumberThunk.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // ---- deleteOrder
        builder
            .addCase(deleteOrderThunk.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(deleteOrderThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.orders = state.orders.filter((o) => o._id !== id);
                    if (state.detailOrder?._id === id) state.detailOrder = {};
                }
            })
            .addCase(deleteOrderThunk.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // ---- changeOrderStatus
        builder
            .addCase(changeOrderStatusThunk.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(changeOrderStatusThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.success = true;
                state.message.success = action.payload.message || "Updated";

                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.orders, updated._id);
                    if (idx !== -1)
                        state.orders[idx] = {
                            ...state.orders[idx],
                            ...updated,
                        };
                    if (state.detailOrder?._id === updated._id) {
                        state.detailOrder = {
                            ...state.detailOrder,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(changeOrderStatusThunk.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // ---- confirmOrderedMenu
        builder
            .addCase(confirmOrderedMenu.pending, (state) => {
                state.loading = true; // maintains backward-compat flag
                state.status = "loading";
                state.message.error = "";
                state.success = false;
            })
            .addCase(confirmOrderedMenu.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.success = true;
                state.confirmedMenus = action.payload.data || [];
                state.message.success =
                    action.payload.message || "Ordered menus confirmed.";
            })
            .addCase(confirmOrderedMenu.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.success = false;
                const msg =
                    action.payload?.message ||
                    "Failed to confirm ordered menus.";
                state.message.error = msg;
                state.error = msg;
            });
    },
});

export default orderSlice.reducer;
