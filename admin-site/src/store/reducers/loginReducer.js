import { createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import authService from "../../services/authService";
import { setToken } from "../../helpers/authHelper";

export const submitLogin = (data) => async (dispatch) => {
  return authService
    .login(data)
    .then((response) => {
      const authData = {
        accessToken: `Bearer ${response.data.accessToken}`,
        id: response.data.id,
      };
      dispatch(loginSuccess(response.message));
      setToken(authData);
      Router.push("/");
    })
    .catch((e) => {
      dispatch(loginFailed(e.data.message));
    });
};

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: {
      user: {
        email: "",
        password: "",
      },
      message: {
        error: "",
        success: "",
      },
      isLogin: false,
    },
  },
  reducers: {
    textFieldChangeHandler: (state, action) => {
      const { name } = action.payload;
      const { value } = action.payload;
      state.data.user[name] = value;
    },
    loginSuccess: (state, action) => {
      state.data.message.success = action.payload;
      state.data.message.error = "";
      state.data.login = true;
    },
    loginFailed: (state, action) => {
      state.data.message.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { textFieldChangeHandler, loginSuccess, loginFailed } =
  loginSlice.actions;
export default loginSlice.reducer;
