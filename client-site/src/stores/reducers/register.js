import { createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService';
// import { setToken } from '../../helpers/auth';
import Router from 'next/router';

const initialState = {
  user: {
    fullname: '',
    phone: '',
    email: '',
    password: '',
  },
  message: {
    error: '',
    success: '',
  },
};

export const submitRegister = data => dispatch => {
  return authService.register(data).then(response => {
    if (response.status === 'success') {
      //TODO: do the auto login here, data is in accessToken
      const authData = {
        accessToken: response.data.accessToken,
        id: response.data.id,
      };
      dispatch(registerSuccess(response.message));
      // setToken(authData);
      Router.push('/');
    } else {
      dispatch(registerFailed(response.response.data.message));
    }
    return Promise.resolve();
  });
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: { data: initialState },
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
    resetRegister: (state, action) => {
      state.data = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  textFieldChangeHandler,
  registerSuccess,
  registerFailed,
  resetRegister,
} = registerSlice.actions;
export default registerSlice.reducer;
