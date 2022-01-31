import axios from "axios";
import { BASE_URL_HOST } from "../config/config";

const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL_HOST}/auth/login`, data)
      .then((response) => {
        if (response.status === 200 && response.data.data.role === 1) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const authService = {
  login,
};
export default authService;
