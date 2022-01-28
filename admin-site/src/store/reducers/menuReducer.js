import { createSlice } from "@reduxjs/toolkit";
import menuService from "../../services/menuService";

export const getAllMenus = (requestURL) => async (dispatch) => {
  return menuService
    .getAllMenus(requestURL)
    .then((response) => {
      dispatch(getMenusSuccess(response.data.data));
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
    })
    .catch((e) => {
      dispatch(editMenuDetailFailed(e.data.message));
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
} = menuSlice.actions;
export default menuSlice.reducer;
