import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";

export const getAllCategories = () => async (dispatch) => {
    return categoryService
        .getAllCategories()
        .then((response) => {
            dispatch(getCategoriesSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getCategoriesFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getCategoriesFailed(error.message));
            return error;
        });
};

export const deleteCategory = (id) => async (dispatch) => {
    return categoryService
        .deleteCategory(id)
        .then((response) => {
            dispatch(deleteCategorySuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(deleteCategoryFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(deleteCategoryFailed(error.message));
            return error;
        });
};

export const createCategory = (requestedData) => async (dispatch) => {
    return categoryService
        .createCategory(requestedData)
        .then((response) => {
            dispatch(createCategorySuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(createCategoryFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(createCategoryFailed(error.message));
            return error;
        });
};

export const getDetailCategory = (id) => async (dispatch) => {
    return categoryService
        .getDetailCategory(id)
        .then((response) => {
            dispatch(getCategoryDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getCategoryDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getCategoryDetailFailed(error.message));
            return error;
        });
};

export const editDetailCategory = (id, requestedData) => async (dispatch) => {
    return categoryService
        .editDetailCategory(id, requestedData)
        .then((response) => {
            dispatch(editCategoryDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(editCategoryDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(editCategoryDetailFailed(error.message));
            return error;
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
        detailCategory: {},
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
        getCategoryDetailSuccess: (state, action) => {
            state.detailCategory = { ...action.payload.data };
            state.message.success = action.payload.message;
            state.success = true;
        },
        getCategoryDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deleteCategorySuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deleteCategoryFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        createCategorySuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        createCategoryFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        editCategoryDetailSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        editCategoryDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getCategoriesSuccess,
    getCategoriesFailed,
    getCategoryDetailSuccess,
    getCategoryDetailFailed,
    deleteCategorySuccess,
    deleteCategoryFailed,
    createCategorySuccess,
    createCategoryFailed,
    editCategoryDetailSuccess,
    editCategoryDetailFailed,
} = categorySlice.actions;
export default categorySlice.reducer;
