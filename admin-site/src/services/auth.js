import axios from "axios";
import { BASE_URL_HOST } from "../config/config";

const login = (data) => {
  return axios
    .post(`${BASE_URL_HOST}/auth/login`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return { message: "Error unknown" };
      }
    });
};

const auth = {
  login,
};
export default auth;
