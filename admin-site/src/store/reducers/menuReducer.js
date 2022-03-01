import { createSlice } from "@reduxjs/toolkit";
import menuService from "../../services/menuService";

export const getAllMenus = (requestURL) => async (dispatch) => {
    return menuService
        .getAllMenus(requestURL)
        .then((response) => {
            dispatch(getMenusSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            dispatch(getMenusFailed(e.data.message));
            return e.data;
        });
};

export const getDetailMenu = (id) => async (dispatch) => {
    return menuService
        .getDetailMenu(id)
        .then((response) => {
            dispatch(getMenuDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            dispatch(getMenuDetailFailed(e.data.message));
            return e.data;
        });
};

export const editDetailMenu = (id, requestedData) => async (dispatch) => {
    return menuService
        .editDetailMenu(id, requestedData)
        .then((response) => {
            dispatch(editMenuDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            dispatch(editMenuDetailFailed(e.data.message));
            return e.data;
        });
};

export const editDetailMenuImages = (id, requestedData) => async (dispatch) => {
    return menuService
        .editDetailMenuImages(id, requestedData)
        .then((response) => {
            dispatch(editMenuDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            dispatch(editMenuDetailFailed(e.data.message));
            return e.data;
        });
};

export const createMenu = (requestedData) => async (dispatch) => {
    return menuService
        .createMenu(requestedData)
        .then((response) => {
            dispatch(createMenuSuccess(response));
            return response;
        })
        .catch((e) => {
            dispatch(createMenuFailed(e.data.message));
            return e.data;
        });
};

export const deleteMenu = (id) => async (dispatch) => {
    return menuService
        .deleteMenu(id)
        .then((response) => {
            dispatch(deleteMenuSuccess(response));
            return response;
        })
        .catch((e) => {
            dispatch(deleteMenuFailed(e.data.message));
            return e.data;
        });
};

export const menuSlice = createSlice({
    name: "product",
    initialState: {
        success: false,
        message: {
            error: "",
            success: "",
        },
        menus: [],
        detailMenu: {},
    },
    reducers: {
        getMenusSuccess: (state, action) => {
            state.menus = [...action.payload];
            state.success = true;
        },
        getMenusFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        getMenuDetailSuccess: (state, action) => {
            state.detailMenu = { ...action.payload.data };
            state.message.success = action.payload.message;
            state.success = true;
        },
        getMenuDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        editMenuDetailSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        editMenuDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        createMenuSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        createMenuFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deleteMenuSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deleteMenuFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getMenusSuccess,
    getMenusFailed,
    getMenuDetailSuccess,
    getMenuDetailFailed,
    editMenuDetailSuccess,
    editMenuDetailFailed,
    createMenuSuccess,
    createMenuFailed,
    deleteMenuSuccess,
    deleteMenuFailed,
} = menuSlice.actions;
export default menuSlice.reducer;
