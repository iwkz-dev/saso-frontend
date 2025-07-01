import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

export const getAllOrders = (requestURL) => async (dispatch) => {
    return orderService
        .getAllOrders(requestURL)
        .then((response) => {
            dispatch(getOrdersSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getOrdersFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getOrdersFailed(error.message));
            return error;
        });
};

export const getOrderByInvoiceNumber = (invoiceNumber) => async (dispatch) => {
    return orderService
        .getOrderByInvoiceNumber(invoiceNumber)
        .then((response) => {
            dispatch(getOrderByInvoiceNumberSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getOrderByInvoiceNumberFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getOrderByInvoiceNumberFailed(error.message));
            return error;
        });
};

export const confirmOrderedMenu = createAsyncThunk(
    "order/confirmOrderedMenu",
    async ({ orderId, vendorId }, thunkAPI) => {
        try {
            const response =
                await orderService.confirmOrderedMenuStatusByVendors(
                    orderId,
                    vendorId,
                );
            return response; // your backend returns { status: "success", data: ... }
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.data || "Unknown error");
        }
    },
);

export const deleteOrder = (id) => async (dispatch) => {
    return orderService
        .deleteOrder(id)
        .then((response) => {
            dispatch(deleteOrderSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(deleteOrderFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(deleteOrderFailed(error.message));
            return error;
        });
};

export const changeOrderStatus = (id, status) => (dispatch) => {
    return orderService
        .changeOrderStatus(id, status)
        .then((response) => {
            dispatch(changeOrderStatusSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(changeOrderStatusFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getOrdersFailed(error.message));
            return error;
        });
};

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        success: false,
        message: {
            error: "",
            success: "",
        },
        orders: [],
        detailOrder: {},
        confirmedMenus: [],
        loading: false,
    },
    reducers: {
        getOrdersSuccess: (state, action) => {
            state.orders = [...action.payload];
            state.success = true;
        },
        getOrdersFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deleteOrderSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deleteOrderFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        changeOrderStatusSuccess: (state, action) => {
            state.message.success = action.payload;
            state.success = true;
        },
        changeOrderStatusFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        getOrderByInvoiceNumberSuccess: (state, action) => {
            state.detailOrder = action.payload;
            state.success = true;
        },
        getOrderByInvoiceNumberFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(confirmOrderedMenu.pending, (state) => {
                state.loading = true;
                state.message.error = "";
                state.success = false;
            })
            .addCase(confirmOrderedMenu.fulfilled, (state, action) => {
                state.loading = false;
                state.confirmedMenus = action.payload.data; // adjust if your backend returns { data: menus }
                state.success = true;
                state.message.success = "Ordered menus confirmed.";
            })
            .addCase(confirmOrderedMenu.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.message.error =
                    action.payload || "Failed to confirm ordered menus.";
            });
    },
});

export const {
    getOrdersSuccess,
    getOrdersFailed,
    deleteOrderSuccess,
    deleteOrderFailed,
    changeOrderStatusSuccess,
    changeOrderStatusFailed,
    getOrderByInvoiceNumberSuccess,
    getOrderByInvoiceNumberFailed,
} = orderSlice.actions;
export default orderSlice.reducer;
