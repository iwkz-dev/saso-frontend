import { createSlice } from "@reduxjs/toolkit";
import contactPersonService from "../../services/contactPersonService";

export const getAllContactPerson = () => async (dispatch) => {
    return contactPersonService
        .getAllContactPerson()
        .then((response) => {
            dispatch(getContactPersonSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getContactPersonFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getContactPersonFailed(error.message));
            return error;
        });
};

export const deleteContactPerson = (id) => async (dispatch) => {
    return contactPersonService
        .deleteContactPerson(id)
        .then((response) => {
            dispatch(deleteContactPersonSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(deleteContactPersonFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(deleteContactPersonFailed(error.message));
            return error;
        });
};

export const createContactPerson = (requestedData) => async (dispatch) => {
    return contactPersonService
        .createContactPerson(requestedData)
        .then((response) => {
            dispatch(createContactPersonSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(createContactPersonFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(createContactPersonFailed(error.message));
            return error;
        });
};

export const getDetailContactPerson = (id) => async (dispatch) => {
    return contactPersonService
        .getDetailContactPerson(id)
        .then((response) => {
            dispatch(getContactPersonDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getContactPersonDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getContactPersonDetailFailed(error.message));
            return error;
        });
};

export const editDetailContactPerson =
    (id, requestedData) => async (dispatch) => {
        return contactPersonService
            .editDetailContactPerson(id, requestedData)
            .then((response) => {
                dispatch(editContactPersonDetailSuccess(response));
                return response;
            })
            .catch((e) => {
                if (e) {
                    dispatch(editContactPersonDetailFailed(e.data.message));
                    return e.data;
                }
                const error = {
                    message: "Server Error",
                    status: "failed",
                };
                dispatch(editContactPersonDetailFailed(error.message));
                return error;
            });
    };

export const contactPersonSlice = createSlice({
    name: "contactPerson",
    initialState: {
        success: false,
        message: {
            error: "",
            success: "",
        },
        contactPerson: [],
        detailContactPerson: {},
    },
    reducers: {
        getContactPersonSuccess: (state, action) => {
            state.contactPerson = [...action.payload];
            state.success = true;
        },
        getContactPersonFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        getContactPersonDetailSuccess: (state, action) => {
            state.detailContactPerson = { ...action.payload.data };
            state.message.success = action.payload.message;
            state.success = true;
        },
        getContactPersonDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deleteContactPersonSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deleteContactPersonFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        createContactPersonSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        createContactPersonFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        editContactPersonDetailSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        editContactPersonDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getContactPersonSuccess,
    getContactPersonFailed,
    getContactPersonDetailSuccess,
    getContactPersonDetailFailed,
    deleteContactPersonSuccess,
    deleteContactPersonFailed,
    createContactPersonSuccess,
    createContactPersonFailed,
    editContactPersonDetailSuccess,
    editContactPersonDetailFailed,
} = contactPersonSlice.actions;
export default contactPersonSlice.reducer;
