import { createSlice } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

const initialState = {
    data: [],
    message: {
        error: "",
        success: "",
    },
    detailOrder: null,
};

export const submitOrder = (data, isAuthRequired) => async (dispatch) => {
    if (!isAuthRequired) {
        return dispatch(submitOrderGuest(data));
    } else {
        return orderService.postOrder(data).then((response) => {
            if (response.status === "success") {
                dispatch(submitOrderSuccess(response.message));
                return response;
            } else {
                dispatch(submitOrderFailed(response.message));
                return response;
            }
        });
    }
};

export const submitOrderGuest = (data) => async (dispatch) => {
    return orderService.postOrderGuest(data).then((response) => {
        if (response?.status === "success") {
            dispatch(submitOrderSuccess(response.message));
            return response;
        } else {
            dispatch(submitOrderFailed(response.message));
            return response;
        }
    });
};

export const getOrderList = () => async (dispatch) => {
    return orderService.getOrderList().then((response) => {
        if (response?.data.status === "success") {
            dispatch(getOrderListSuccess(response?.data));
            return response;
        } else {
            dispatch(getOrderListFailed(response?.data));
            return response;
        }
    });
};

export const getOrderDetail = (id) => async (dispatch) => {
    return orderService.getOrderDetail(id).then((response) => {
        if (response?.data?.status === "success") {
            dispatch(getOrderDetailSuccess(response?.data));
            return response;
        } else {
            dispatch(getOrderDetailFailed(response?.data));
            return response;
        }
    });
};

export const getOrderDetailByInvoiceNumber = (data) => async (dispatch) => {
    return orderService.getOrderDetailByInvoiceNumber(data).then((response) => {
        if (response?.data?.status === "success") {
            dispatch(getOrderDetailSuccess(response?.data));
            return response;
        } else {
            dispatch(getOrderDetailFailed(response?.data));
            return response;
        }
    });
};

export const getOrderPdf = (id) => {
    return orderService.getOrderPdf(id);
};

export const deleteOrder = (id) => async (dispatch) => {
    return orderService.deleteOrder(id);
};

export const approveOrder = (data, isAuthRequired) => async (dispatch) => {
    if (!isAuthRequired) {
        return orderService.approveOrderGuest(data).then((response) => {
            if (response?.data?.status === "success") {
                dispatch(approvedOrderSuccess(response?.data));
                return response;
            } else {
                dispatch(approvedOrderFailed(response?.data));
                return response;
            }
        });
    } else {
        return orderService.approveOrder(data).then((response) => {
            if (response?.data?.status === "success") {
                dispatch(approvedOrderSuccess(response?.data));
                return response;
            } else {
                dispatch(approvedOrderFailed(response?.data));
                return response;
            }
        });
    }
};

export const resetOrderData = () => async (dispatch) => {
    dispatch(resetData());
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
            state.data.detailOrder = null;
            state.data.message.error = action.payload;
            state.data.message.success = "";
        },
        approvedOrderSuccess: (state, action) => {
            state.data.message.success = action.payload.message;
            state.data.message.error = "";
        },
        approvedOrderFailed: (state, action) => {
            state.data.message.error = action.payload;
            state.data.message.success = "";
        },
        resetData: (state, action) => {
            state.data = initialState;
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
    approvedOrderSuccess,
    approvedOrderFailed,
    resetData,
} = orderSlice.actions;
export default orderSlice.reducer;
