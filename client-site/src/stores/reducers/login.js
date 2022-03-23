import { createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import Router from 'next/router';
import { setToken } from '../../helpers/authHelper';

const initialState = {
  user: {
    email: '',
    password: '',
  },
  message: {
    error: '',
    success: '',
  },
  isLogin: false,
};

export const submitLogin = data => dispatch => {
  return authService.login(data).then(response => {
    if (response.status === 'success') {
      const authData = {
        accessToken: response.data.accessToken,
        id: response.data.id,
      };
      dispatch(loginSuccess(response.message));
      setToken(authData);
      Router.push('/');
    } else {
      dispatch(loginFailed(response.message));
    }
    return Promise.resolve();
  });
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: initialState,
  },
  reducers: {
    textFieldChangeHandler: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;
      state.data.user[name] = value;
    },
    loginSuccess: (state, action) => {
      state.data.message.success = action.payload;
      state.data.message.error = '';
    },
    loginFailed: (state, action) => {
      state.data.message.error = action.payload;
    },
    resetLogin: (state, action) => {
      state.data = { ...initialState, isLogin: state.data.isLogin };
    },
  },
});

// Action creators are generated for each case reducer function
export const { textFieldChangeHandler, loginSuccess, loginFailed, resetLogin } =
  loginSlice.actions;
export default loginSlice.reducer;
