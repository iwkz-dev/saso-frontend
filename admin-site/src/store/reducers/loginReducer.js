import { createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import authService from "../../services/authService";
import { setToken } from "../../helpers/authHelper";

export const submitLogin = (data) => (dispatch) =>
  authService.login(data).then((response) => {
    if (response.status === "success" && response.data.role === 1) {
      const authData = {
        accessToken: `Bearer ${response.data.accessToken}`,
        id: response.data.id,
      };
      dispatch(loginSuccess(response.message));
      setToken(authData);
      Router.push("/");
    } else {
      dispatch(loginFailed(response.message));
    }
    return Promise.resolve();
  });

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
