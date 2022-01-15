import Router from "next/router";

export const isAuth = () => !!(getToken() && getUserId());

export const setToken = (data) => {
  localStorage.setItem("access_token", JSON.stringify(data));
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("access_token"))?.accessToken;
  }
  return null;
};

export const getUserId = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("access_token"))?.id;
  }
  return null;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    localStorage.clear();
    Router.push("/login");
  }
};
