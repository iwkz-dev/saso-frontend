import { createSlice } from "@reduxjs/toolkit";
import vendorService from "../../services/vendorService";

export const getAllVendors = () => async (dispatch) => {
    return vendorService
        .getAllVendors()
        .then((response) => {
            dispatch(getVendorsSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getVendorsFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getVendorsFailed(error.message));
            return error;
        });
};

export const deleteVendor = (id) => async (dispatch) => {
    return vendorService
        .deleteVendor(id)
        .then((response) => {
            dispatch(deleteVendorSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(deleteVendorFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(deleteVendorFailed(error.message));
            return error;
        });
};

export const createVendor = (requestedData) => async (dispatch) => {
    return vendorService
        .createVendor(requestedData)
        .then((response) => {
            dispatch(createVendorSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(createVendorFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(createVendorFailed(error.message));
            return error;
        });
};

export const getDetailVendor = (id) => async (dispatch) => {
    return vendorService
        .getDetailVendor(id)
        .then((response) => {
            dispatch(getVendorDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getVendorDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getVendorDetailFailed(error.message));
            return error;
        });
};

export const editDetailVendor = (id, requestedData) => async (dispatch) => {
    return vendorService
        .editDetailVendor(id, requestedData)
        .then((response) => {
            dispatch(editVendorDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(editVendorDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(editVendorDetailFailed(error.message));
            return error;
        });
};

export const vendorSlice = createSlice({
    name: "vendor",
    initialState: {
        success: false,
        message: {
            error: "",
            success: "",
        },
        vendors: [],
        detailVendor: {},
    },
    reducers: {
        getVendorsSuccess: (state, action) => {
            state.vendors = [...action.payload];
            state.success = true;
        },
        getVendorsFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        getVendorDetailSuccess: (state, action) => {
            state.detailVendor = { ...action.payload.data };
            state.message.success = action.payload.message;
            state.success = true;
        },
        getVendorDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deleteVendorSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deleteVendorFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        createVendorSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        createVendorFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        editVendorDetailSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        editVendorDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getVendorsSuccess,
    getVendorsFailed,
    getVendorDetailSuccess,
    getVendorDetailFailed,
    deleteVendorSuccess,
    deleteVendorFailed,
    createVendorSuccess,
    createVendorFailed,
    editVendorDetailSuccess,
    editVendorDetailFailed,
} = vendorSlice.actions;
export default vendorSlice.reducer;
