import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import {
  textFieldChangeHandler,
  submitLogin,
} from "../../store/reducers/login";
import { isAuth } from "../../helpers/auth";

function LoginForm() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.login.data.message.error);
  const userData = useSelector((state) => state.login.data.user);

  useEffect(() => {
    if (isAuth()) {
      Router.push("/");
    }
  });

  const changeHandler = (name, value) => {
    const payload = {
      name,
      value,
    };
    dispatch(textFieldChangeHandler(payload));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(submitLogin(userData));
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl text-gray-900">SASO App</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={(e) => submitHandler(e)}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <span className="text-xs text-red-700 ">{errorMessage}</span>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
