import { createSlice } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

const initialState = {
    data: [],
    message: {
        error: "",
        success: "",
    },
    detailOrder: {},
};

export const submitOrder = (data) => (dispatch) => {
    return orderService.postOrder(data).then((response) => {
        if (response.status === "success") {
            dispatch(submitOrderSuccess(response.message));
            return response;
        } else {
            dispatch(submitOrderFailed(response.message));
            return response;
        }
    });
};

export const getOrderList = () => (dispatch) => {
    return orderService.getOrderList().then((response) => {
        if (response.data.status === "success") {
            dispatch(getOrderListSuccess(response.data));
            return response;
        } else {
            dispatch(getOrderListFailed(response.data));
            return response;
        }
    });
};

export const getOrderDetail = (id) => (dispatch) => {
    return orderService.getOrderDetail(id).then((response) => {
        if (response.data.status === "success") {
            dispatch(getOrderDetailSuccess(response.data));
            return response;
        } else {
            dispatch(getOrderDetailFailed(response.data));
            return response;
        }
    });
};

export const getOrderPdf = (id) => (dispatch) => {
    return orderService.getOrderPdf(id).then((response) => {
        if (response.status === "success") {
            dispatch(submitOrderSuccess(response.message));
            return response;
        } else {
            dispatch(submitOrderFailed(response.message));
            return response;
        }
    });
};

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        data: initialState,
    },
    reducers: {
        submitOrderSuccess: (state, action) => {
            state.data.message.success = action.payload;
            state.data.message.error = "";
        },
        submitOrderFailed: (state, action) => {
            state.data.message.error = action.payload;
            state.data.message.success = "";
        },
        getOrderListSuccess: (state, action) => {
            state.data.data = [...action.payload.data.data];
            state.data.message.success = action.payload.message;
            state.data.message.error = "";
        },
        getOrderListFailed: (state, action) => {
            state.data.message.error = action.payload;
            state.data.message.success = "";
        },
        getOrderPdfSuccess: (state, action) => {
            state.data.message.success = action.payload;
            state.data.message.error = "";
        },
        getOrderPdfFailed: (state, action) => {
            state.data.message.error = action.payload;
            state.data.message.success = "";
        },
        getOrderDetailSuccess: (state, action) => {
            state.data.detailOrder = action.payload.data;
            state.data.message.success = action.payload.message;
            state.data.message.error = "";
        },
        getOrderDetailFailed: (state, action) => {
            state.data.message.error = action.payload;
            state.data.message.success = "";
        },
    },
});

export const {
    submitOrderSuccess,
    submitOrderFailed,
    getOrderListSuccess,
    getOrderListFailed,
    getOrderPdfSuccess,
    getOrderPdfFailed,
    getOrderDetailSuccess,
    getOrderDetailFailed,
} = orderSlice.actions;
export default orderSlice.reducer;
