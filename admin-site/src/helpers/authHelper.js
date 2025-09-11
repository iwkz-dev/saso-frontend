import Router from "next/router";

const TOKEN_KEY = "access_token";

const readToken = () => {
    if (typeof window === "undefined") return null;
    try {
        return JSON.parse(localStorage.getItem(TOKEN_KEY));
    } catch {
        return null;
    }
};

export const isAuth = (response) => {
    const token = getToken();
    const userId = getUserId();

    if (response && token && userId) {
        const msg = response?.message?.toLowerCase();
        const name = response?.name?.toLowerCase();
        if (msg === "invalid token" || name === "invalid auth") {
            logout();
        }
    }

    return Boolean(token && userId);
};

export const setToken = (data) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    }
};

export const getToken = () => readToken()?.accessToken ?? null;

export const getUserId = () => readToken()?.id ?? null;

export const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        Router.push("/login");
    }
};
