import { createSlice } from '@reduxjs/toolkit';
import orderService from '../../services/orderService';

const initialState = {
  data: [],
  message: {
    error: '',
    success: '',
  },
};

export const submitOrder = data => dispatch => {
  return orderService.postOrder(data).then(response => {
    if (response.status === 'success') {
      dispatch(submitOrderSuccess(response.message));
    } else {
      dispatch(submitOrderFailed(response.message));
    }
    return Promise.resolve();
  });
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: initialState,
  },
  reducers: {
    submitOrderSuccess: (state, action) => {
      state.data.message.success = action.payload;
      state.data.message.error = '';
    },
    submitOrderFailed: (state, action) => {
      state.data.message.error = action.payload;
      state.data.message.success = '';
    },
  },
});

export const { submitOrderSuccess, submitOrderFailed } = orderSlice.actions;
export default orderSlice.reducer;
