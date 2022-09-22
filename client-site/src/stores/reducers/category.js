import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

const initialState = {
  data: [],
  message: {
    error: '',
    success: '',
  },
};

export const getAllCategories = filter => dispatch => {
  console.log('run');
  return categoryService.getCategory(filter).then(response => {
    if (response.data.status === 'success') {
      dispatch(categorySuccess(response.data));
    } else {
      dispatch(categoryFailed(response.data));
    }
    return Promise.resolve();
  });
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    categorySuccess: (state, action) => {
      state.data = [...action.payload.data];
      state.message.success = action.payload.message;
      state.message.error = '';
    },
    categoryFailed: (state, action) => {
      state.message.error = action.payload.data.message;
    },
    resetCategory: (state, action) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { categorySuccess, categoryFailed } = categorySlice.actions;
export default categorySlice.reducer;
