import axios from "axios";
import {BASE_URL_HOST} from "../config/config";
import Router from "next/router";

export const isAuth = ()=>{
    if(getToken() && getUserId()){
        return true;
    }
    return false;
}

export const setToken = (data)=>{
    localStorage.setItem("access_token", JSON.stringify(data));
}

export const getToken = ()=>{
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const token = JSON.parse(localStorage.getItem("access_token"))?.accessToken;
        return token;
    }
    return null;
}

export const getUserId = ()=>{
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const userId = JSON.parse(localStorage.getItem("access_token"))?.id;
        return userId;
    }
    return null;
}

export const submitLogin = (data)=>{
    axios.post(`${BASE_URL_HOST}/auth/login`, data)
        .then(response => {
            if(response.data.status==="success"){
                const authData = {
                    accessToken: response.data.data.accessToken,
                    id: response.data.data.id,
                }
                setToken(authData);
                Router.push("/");
            }

        })
        .catch(error => console.log(error));
}

export const logout = ()=>{
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        localStorage.clear();
        Router.push("/login");
    }
}