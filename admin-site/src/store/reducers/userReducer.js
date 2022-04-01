import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

export const getAllUsers = (requestURL) => async (dispatch) => {
    return userService
        .getAllUsers(requestURL)
        .then((response) => {
            dispatch(getUsersSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getUsersFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getUsersFailed(error.message));
            return error;
        });
};

export const getDetailUser = (id) => async (dispatch) => {
    return userService
        .getDetailUser(id)
        .then((response) => {
            dispatch(getUserDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getUserDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getUserDetailFailed(error.message));
            return error;
        });
};

export const createUser = (requestedData) => async (dispatch) => {
    return userService
        .createUser(requestedData)
        .then((response) => {
            dispatch(createUserSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(createUserFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(createUserFailed(error.message));
            return error;
        });
};

export const deleteUser = (id) => async (dispatch) => {
    return userService
        .deleteUser(id)
        .then((response) => {
            dispatch(deleteUserSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(deleteUserFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(deleteUserFailed(error.message));
            return error;
        });
};

export const editDetailUser = (id, requestedData) => async (dispatch) => {
    return userService
        .editDetailUser(id, requestedData)
        .then((response) => {
            dispatch(editUserDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(editUserDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(editUserDetailFailed(error.message));
            return error;
        });
};

export const userSlice = createSlice({
    name: "user",
    initialState: {
        success: false,
        message: {
            error: "",
            success: "",
        },
        users: [],
        detailUser: {},
    },
    reducers: {
        getUsersSuccess: (state, action) => {
            state.users = [...action.payload];
            state.success = true;
        },
        getUsersFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        getUserDetailSuccess: (state, action) => {
            state.detailUser = { ...action.payload.data };
            state.message.success = action.payload.message;
            state.success = true;
        },
        getUserDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        editUserDetailSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        editUserDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        createUserSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        createUserFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deleteUserSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deleteUserFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getUsersSuccess,
    getUsersFailed,
    getUserDetailSuccess,
    getUserDetailFailed,
    editUserDetailSuccess,
    editUserDetailFailed,
    createUserSuccess,
    createUserFailed,
    deleteUserSuccess,
    deleteUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
