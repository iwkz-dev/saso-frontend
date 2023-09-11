import { createSlice } from "@reduxjs/toolkit";
import menuService from "../../services/menuService";

const initialState = {
    data: [],
    message: {
        error: "",
        success: "",
    },
    menuDetail: null,
};

export const getMenu = (filter) => (dispatch) => {
    return menuService.getMenu(filter).then((response) => {
        if (response?.data.status === "success") {
            dispatch(menuSuccess(response.data));
        } else {
            dispatch(menuFailed(response.data));
        }
        return Promise.resolve();
    });
};

export const getMenuWithId = (id) => (dispatch) => {
    return menuService.getMenuWithId(id).then((response) => {
        if (response?.data.status === "success") {
            dispatch(menuDetailSuccess(response.data));
        } else {
            dispatch(menuDetailFailed(response));
        }
        return Promise.resolve();
    });
};

export const menuSlice = createSlice({
    name: "menu",
    initialState: initialState,
    reducers: {
        menuSuccess: (state, action) => {
            state.data = [...action.payload.data.data];
            state.message.success = action.payload.data.message;
            state.message.error = "";
        },
        menuFailed: (state, action) => {
            state.message.error = action.payload.data.message;
        },
        menuDetailSuccess: (state, action) => {
            state.menuDetail = action.payload.data;
            state.message.success = action.payload.message;
            state.message.error = "";
        },
        menuDetailFailed: (state, action) => {
            state.message.error = "Fetch menu detail failed";
            state.menuDetail = null;
        },
        resetMenu: (state, action) => {
            state = initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    menuSuccess,
    menuFailed,
    menuDetailSuccess,
    menuDetailFailed,
    resetMenu,
} = menuSlice.actions;
export default menuSlice.reducer;
