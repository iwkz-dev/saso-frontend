import { createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import auth from "../../services/auth";
import { setToken } from "../../helpers/auth";

export const submitLogin = (data) => (dispatch) =>
  auth.login(data).then((response) => {
    if (response.status === "success" && response.data.role === 1) {
      const authData = {
        accessToken: response.data.accessToken,
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
