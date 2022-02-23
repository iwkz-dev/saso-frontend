import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";

export const getAllCategories = () => async (dispatch) => {
    return categoryService
        .getAllCategories()
        .then((response) => {
            dispatch(getCategoriesSuccess(response.data.data));
        })
        .catch((e) => {
            dispatch(getCategoriesFailed(e.data.message));
            return e.data;
        });
};

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        success: false,
        message: {
            error: "",
            success: "",
        },
        categories: [],
    },
    reducers: {
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
export const { getCategoriesSuccess, getCategoriesFailed } =
    categorySlice.actions;
export default categorySlice.reducer;
