import { createSlice } from '@reduxjs/toolkit';
import menuService from '../../services/menuService';

const initialState = {
  data: [],
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
  initialState: initialState,
  reducers: {
    menuSuccess: (state, action) => {
      state.data = [...action.payload.data.data];
      state.message.success = action.payload.data.message;
      state.message.error = '';
    },
    menuFailed: (state, action) => {
      state.message.error = action.payload.data.message;
    },
    resetMenu: (state, action) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { menuSuccess, menuFailed, resetMenu } = menuSlice.actions;
export default menuSlice.reducer;
