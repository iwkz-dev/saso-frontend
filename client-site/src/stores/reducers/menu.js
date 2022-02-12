import { createSlice } from '@reduxjs/toolkit';
import menuService from '../../services/menuService';

const initialState = {
  menu: [],
  message: {
    error: '',
    success: '',
  },
};

export const getMenu = () => dispatch => {
  return menuService.getMenu().then(response => {
    if (response.data.status === 'success') {
      dispatch(menuSuccess(response.data));
    } else {
      dispatch(menuFailed(response.data));
    }
    return Promise.resolve();
  });
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState: { data: initialState },
  reducers: {
    menuSuccess: (state, action) => {
      state.data.menu = [...action.payload.data.data];
      state.data.message.success = action.payload.data.message;
      state.data.message.error = '';
    },
    menuFailed: (state, action) => {
      state.data.message.error = action.payload.data.message;
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
