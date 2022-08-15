import { createSlice } from "@reduxjs/toolkit";
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
            state.message.error = action.payload;
            state.success = false;
        },
        changeOrderStatusFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

export const {
    getOrdersSuccess,
    getOrdersFailed,
    deleteOrderSuccess,
    deleteOrderFailed,
    changeOrderStatusSuccess,
    changeOrderStatusFailed,
} = orderSlice.actions;
export default orderSlice.reducer;
