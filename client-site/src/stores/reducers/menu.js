import { createSlice } from '@reduxjs/toolkit';
import SasoApi from '../../api/SasoApi';
import authService from '../../services/authService';

const initialState = {
  data: [],
  message: {
    error: '',
    success: '',
  },
};

export const getMenu = data => dispatch => {
  return SasoApi.getData('/customer/menu').then(response => {
    if (response.data.status === 'success') {
      console.log('aaa', response.data);
      dispatch(menuSuccess(response));
    } else {
      // dispatch(menuFailed(response.response.data.message));
    }
    return Promise.resolve();
  });
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState: { data: initialState },
  reducers: {
    menuSuccess: (state, action) => {
      debugger;
      // state.data = action.payload.data;
      // state.data.message.success = action.payload.message;
      // state.data.message.error = '';
    },
    menuFailed: (state, action) => {
      // state.data.message.error = action.payload;
    },
    resetMenu: (state, action) => {
      state.data = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { textFieldChangeHandler, menuSuccess, menuFailed, resetMenu } =
  menuSlice.actions;
export default menuSlice.reducer;
