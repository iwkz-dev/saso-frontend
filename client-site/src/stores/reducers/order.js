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
      console.log('test', response.message);
      dispatch(submitOrderSuccess(response.message));
    } else {
      console.log('test', response.message);
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
    },
  },
});

export const { submitOrderSuccess, submitOrderFailed } = orderSlice.actions;
export default orderSlice.reducer;
