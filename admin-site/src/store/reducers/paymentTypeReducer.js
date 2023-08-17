import { createSlice } from "@reduxjs/toolkit";
import paymentTypeService from "../../services/paymentTypeService";

export const getAllPaymentTypes = () => async (dispatch) => {
    return paymentTypeService
        .getAllPaymentTypes()
        .then((response) => {
            dispatch(getPaymentTypesSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getPaymentTypesFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getPaymentTypesFailed(error.message));
            return error;
        });
};

export const deletePaymentType = (id) => async (dispatch) => {
    return paymentTypeService
        .deletePaymentType(id)
        .then((response) => {
            dispatch(deletePaymentTypeSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(deletePaymentTypeFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(deletePaymentTypeFailed(error.message));
            return error;
        });
};

export const createPaymentType = (requestedData) => async (dispatch) => {
    return paymentTypeService
        .createPaymentType(requestedData)
        .then((response) => {
            dispatch(createPaymentTypeSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(createPaymentTypeFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(createPaymentTypeFailed(error.message));
            return error;
        });
};

export const getDetailPaymentType = (id) => async (dispatch) => {
    return paymentTypeService
        .getDetailPaymentType(id)
        .then((response) => {
            dispatch(getPaymentTypeDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getPaymentTypeDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getPaymentTypeDetailFailed(error.message));
            return error;
        });
};

export const editDetailPaymentType =
    (id, requestedData) => async (dispatch) => {
        return paymentTypeService
            .editDetailPaymentType(id, requestedData)
            .then((response) => {
                dispatch(editPaymentTypeDetailSuccess(response));
                return response;
            })
            .catch((e) => {
                if (e) {
                    dispatch(editPaymentTypeDetailFailed(e.data.message));
                    return e.data;
                }
                const error = {
                    message: "Server Error",
                    status: "failed",
                };
                dispatch(editPaymentTypeDetailFailed(error.message));
                return error;
            });
    };

export const paymentTypeSlice = createSlice({
    name: "paymentType",
    initialState: {
        success: false,
        message: {
            error: "",
            success: "",
        },
        paymentTypes: [],
        detailPaymentType: {},
    },
    reducers: {
        getPaymentTypesSuccess: (state, action) => {
            state.paymentTypes = [...action.payload];
            state.success = true;
        },
        getPaymentTypesFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        getPaymentTypeDetailSuccess: (state, action) => {
            state.detailPaymentType = { ...action.payload.data };
            state.message.success = action.payload.message;
            state.success = true;
        },
        getPaymentTypeDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deletePaymentTypeSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deletePaymentTypeFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        createPaymentTypeSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        createPaymentTypeFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        editPaymentTypeDetailSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        editPaymentTypeDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getPaymentTypesSuccess,
    getPaymentTypesFailed,
    getPaymentTypeDetailSuccess,
    getPaymentTypeDetailFailed,
    deletePaymentTypeSuccess,
    deletePaymentTypeFailed,
    createPaymentTypeSuccess,
    createPaymentTypeFailed,
    editPaymentTypeDetailSuccess,
    editPaymentTypeDetailFailed,
} = paymentTypeSlice.actions;
export default paymentTypeSlice.reducer;
