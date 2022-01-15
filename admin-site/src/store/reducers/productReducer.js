import { createSlice } from "@reduxjs/toolkit";
import productService from "../../services/productService";

export const getAllMenus = (requestURL) => (dispatch) =>
  productService.getAllMenus(requestURL).then((response) => {
    if (response.status === "success") {
      dispatch(getMenusSuccess(response.data.data));
    } else {
      dispatch(getMenusFailed(response.message));
    }
  });

export const getAllEvents = () => (dispatch) =>
  productService.getAllEvents().then((response) => {
    if (response.status === "success") {
      dispatch(getEventsSuccess(response.data.data));
    } else {
      dispatch(getEventsFailed(response.message));
    }
  });

export const getAllCategories = () => (dispatch) =>
  productService.getAllCategories().then((response) => {
    if (response.status === "success") {
      dispatch(getCategoriesSuccess(response.data.data));
    } else {
      dispatch(getCategoriesFailed(response.message));
    }
  });

export const productSlice = createSlice({
  name: "product",
  initialState: {
    success: false,
    message: {
      error: "",
      success: "",
    },
    menus: [],
    events: [],
    categories: [],
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
    getEventsSuccess: (state, action) => {
      state.events = [...action.payload];
      state.success = true;
    },
    getEventsFailed: (state, action) => {
      state.message.error = action.payload;
      state.success = false;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = [...action.payload];
      state.success = true;
    },
    getCategoriesFailed: (state, action) => {
      state.message.error = action.payload;
      state.success = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getMenusSuccess,
  getMenusFailed,
  getEventsSuccess,
  getEventsFailed,
  getCategoriesSuccess,
  getCategoriesFailed,
} = productSlice.actions;
export default productSlice.reducer;
