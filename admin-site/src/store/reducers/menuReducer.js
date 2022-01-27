import { createSlice } from "@reduxjs/toolkit";
import menuService from "../../services/menuService";

export const getAllMenus = (requestURL) => (dispatch) =>
  menuService.getAllMenus(requestURL).then((response) => {
    if (response.status === "success") {
      dispatch(getMenusSuccess(response.data.data));
    } else {
      dispatch(getMenusFailed(response.message));
    }
  });

export const getDetailMenu = (id) => (dispatch) =>
  menuService.getDetailMenu(id).then((response) => {
    console.log(response);
    if (response.status === "success") {
      dispatch(getMenuDetailSuccess(response));
    } else {
      dispatch(getMenusFailed(response.message));
    }
  });

export const editDetailMenu = (id, requestedData) => (dispatch) =>
  menuService.editDetailMenu(id, requestedData).then((response) => {
    console.log(response);
    if (response.status === "success") {
      dispatch(editMenuDetailSuccess(response));
    } else {
      dispatch(editMenuDetailFailed(response.message));
    }
  });

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
    getMenuDetailSuccess: (state, action) => {
      state.detailMenu = { ...action.payload.data };
      state.message.success = action.payload.message;
    },
    getMenusFailed: (state, action) => {
      state.message.error = action.payload;
    },
    editMenuDetailSuccess: (state, action) => {
      state.message.success = action.payload.message;
    },
    editMenuDetailFailed: (state, action) => {
      state.message.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getMenusSuccess,
  getMenusFailed,
  getMenuDetailSuccess,
  editMenuDetailSuccess,
  editMenuDetailFailed,
} = menuSlice.actions;
export default menuSlice.reducer;
