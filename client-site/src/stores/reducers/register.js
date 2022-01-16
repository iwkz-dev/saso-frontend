import { createSlice } from '@reduxjs/toolkit';
import auth from '../../services/auth';
// import { setToken } from '../../helpers/auth';
import Router from 'next/router';

export const submitRegister = data => dispatch => {
  return auth.login(data).then(response => {
    if (response.status === 'success') {
      const authData = {
        accessToken: response.data.accessToken,
        id: response.data.id,
      };
      dispatch(loginSuccess(response.message));
      // setToken(authData);
      Router.push('/');
    } else {
      dispatch(loginFailed(response.message));
    }
    return Promise.resolve();
  });
};

export const registerSlice = createSlice({
  name: 'login',
  initialState: {
    data: {
      user: {
        nama: '',
        telefon: '',
        email: '',
        password: '',
      },
      message: {
        error: '',
        success: '',
      },
      isLogin: false,
    },
  },
  reducers: {
    textFieldChangeHandler: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;
      state.data.user[name] = value;
    },
    registerSuccess: (state, action) => {
      state.data.message.success = action.payload;
      state.data.message.error = '';
    },
    registerFailed: (state, action) => {
      state.data.message.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { textFieldChangeHandler, registerSuccess, registerFailed } =
  registerSlice.actions;
export default registerSlice.reducer;
