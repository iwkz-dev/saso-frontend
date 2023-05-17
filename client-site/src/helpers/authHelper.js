import Router from "next/router";

export const isAuth = () => !!(getToken() && getUserId());

export const setToken = (data) => {
    localStorage.setItem("access_token_client", JSON.stringify(data));
};

export const getToken = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("access_token_client"))
            ?.accessToken;
    }
    return null;
};

export const getUserId = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("access_token_client"))?.id;
    }
    return null;
};

export const logout = () => {
    if (typeof window !== "undefined") {
        // Perform localStorage action
        localStorage.removeItem("access_token_client");
        Router.push("/");
    }
};
