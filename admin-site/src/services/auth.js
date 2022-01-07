import axios from "axios";
import {BASE_URL_HOST} from "../config/config";

const login = (data) => {
    return axios
        .post(`${BASE_URL_HOST}/auth/login`, data)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
};

const auth = {
    login
};
export default auth;
