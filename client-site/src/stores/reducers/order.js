import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

const initialState = {
    list: [],
    detail: null,
    listStatus: "idle",
    detailStatus: "idle",
    submitStatus: "idle",
    approveStatus: "idle",
    pdfStatus: "idle",
    message: null,
    error: null,
};

// ---------- Thunks ----------
export const submitOrder = createAsyncThunk(
    "order/submitOrder",
    async ({ data, isAuthRequired }, { rejectWithValue }) => {
        try {
            const res = isAuthRequired
                ? await orderService.postOrder(data)
                : await orderService.postOrderGuest(data);

            const payload = res?.data ?? res;
            if ((payload?.status || res?.status) !== "success") {
                return rejectWithValue(payload?.message || "Order submission failed");
            }

            return {
                message: payload?.message ?? "Order submitted",
                order: payload?.createOrder ?? null,
                paymentResponse: payload?.paymentResponse ?? null,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

export const getOrderList = createAsyncThunk(
    "order/getOrderList",
    async (_, { rejectWithValue }) => {
        try {
            const res = await orderService.getOrderList();
            const d = res?.data;
            if (d?.status !== "success") {
                return rejectWithValue(d?.message || "Failed to fetch orders");
            }
            const items = d?.data?.data ?? d?.data ?? [];
            return { items, message: d?.message ?? null };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

export const getOrderDetail = createAsyncThunk(
    "order/getOrderDetail",
    async (id, { rejectWithValue }) => {
        try {
            const res = await orderService.getOrderDetail(id);
            const d = res?.data;
            if (d?.status !== "success") {
                return rejectWithValue(d?.message || "Failed to fetch order detail");
            }
            return { detail: d?.data ?? null, message: d?.message ?? null };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

export const getOrderDetailByInvoiceNumber = createAsyncThunk(
    "order/getOrderDetailByInvoiceNumber",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await orderService.getOrderDetailByInvoiceNumber(payload);
            const d = res?.data;
            if (d?.status !== "success") {
                return rejectWithValue(d?.message || "Failed to fetch order detail");
            }
            return { detail: d?.data ?? null, message: d?.message ?? null };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

export const approveOrder = createAsyncThunk(
    "order/approveOrder",
    async ({ data, isAuthRequired }, { rejectWithValue }) => {
        try {
            const res = isAuthRequired
                ? await orderService.approveOrder(data)
                : await orderService.approveOrderGuest(data);

            const d = res?.data;
            if (d?.status !== "success") {
                return rejectWithValue(d?.message || "Approval failed");
            }
            return { message: d?.message ?? "Order approved" };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error"
            );
        }
    }
);

export const fetchOrderPdf = createAsyncThunk(
    "order/fetchOrderPdf",
    async (id, { rejectWithValue }) => {
        try {
            const res = await orderService.getOrderPdf(id);
            return res;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Failed to fetch PDF"
            );
        }
    }
);

// ---------- Slice ----------
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
            state.error = null;
        },
        resetOrderState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.submitStatus = "loading";
                state.message = null;
                state.error = null;
            })
            .addCase(submitOrder.fulfilled, (state, action) => {
                state.submitStatus = "succeeded";
                state.message = action.payload.message;
                state.detail = action.payload.order;
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.submitStatus = "failed";
                state.error = action.payload || "Submit failed";
            });

        // List
        builder
            .addCase(getOrderList.pending, (state) => {
                state.listStatus = "loading";
                state.error = null;
            })
            .addCase(getOrderList.fulfilled, (state, action) => {
                state.listStatus = "succeeded";
                state.list = action.payload.items;
                state.message = action.payload.message ?? null;
            })
            .addCase(getOrderList.rejected, (state, action) => {
                state.listStatus = "failed";
                state.error = action.payload || "Fetch list failed";
            });

        // Detail (by id or invoice)
        builder
            .addCase(getOrderDetail.pending, (state) => {
                state.detailStatus = "loading";
                state.error = null;
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.detailStatus = "succeeded";
                state.detail = action.payload.detail;
                state.message = action.payload.message ?? null;
            })
            .addCase(getOrderDetail.rejected, (state, action) => {
                state.detailStatus = "failed";
                state.detail = null;
                state.error = action.payload || "Fetch detail failed";
            })
            .addCase(getOrderDetailByInvoiceNumber.pending, (state) => {
                state.detailStatus = "loading";
                state.error = null;
            })
            .addCase(getOrderDetailByInvoiceNumber.fulfilled, (state, action) => {
                state.detailStatus = "succeeded";
                state.detail = action.payload.detail;
                state.message = action.payload.message ?? null;
            })
            .addCase(getOrderDetailByInvoiceNumber.rejected, (state, action) => {
                state.detailStatus = "failed";
                state.detail = null;
                state.error = action.payload || "Fetch detail failed";
            });

        // Approve
        builder
            .addCase(approveOrder.pending, (state) => {
                state.approveStatus = "loading";
                state.error = null;
            })
            .addCase(approveOrder.fulfilled, (state, action) => {
                state.approveStatus = "succeeded";
                state.message = action.payload.message;
            })
            .addCase(approveOrder.rejected, (state, action) => {
                state.approveStatus = "failed";
                state.error = action.payload || "Approve failed";
            });

        // PDF
        builder
            .addCase(fetchOrderPdf.pending, (state) => {
                state.pdfStatus = "loading";
                state.error = null;
            })
            .addCase(fetchOrderPdf.fulfilled, (state) => {
                state.pdfStatus = "succeeded";
            })
            .addCase(fetchOrderPdf.rejected, (state, action) => {
                state.pdfStatus = "failed";
                state.error = action.payload || "PDF download failed";
            });
    },
});

export const { clearMessage, resetOrderState } = orderSlice.actions;

// ---------- Selectors ----------
export const selectOrderList = (state) => state.order.list;
export const selectOrderDetail = (state) => state.order.detail;
export const selectOrderMessage = (state) => state.order.message;
export const selectOrderError = (state) => state.order.error;

export const selectOrderStatuses = (state) => ({
    listStatus: state.order.listStatus,
    detailStatus: state.order.detailStatus,
    submitStatus: state.order.submitStatus,
    approveStatus: state.order.approveStatus,
    pdfStatus: state.order.pdfStatus,
});

export default orderSlice.reducer;
