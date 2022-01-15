import axios from "axios";
import {
  BASE_URL_HOST_ADMIN_MENU,
  BASE_URL_HOST_ADMIN_EVENT,
  BASE_URL_HOST_ADMIN_CATEGORY,
} from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
  accept: "application/JSON",
  access_token: getToken(),
};

const adminAxios = axios.create({
  headers,
});

const getAllMenus = (requestURL) =>
  adminAxios
    .get(`${BASE_URL_HOST_ADMIN_MENU}${requestURL || ""}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return { message: "Error unknown" };
      }
    });

const getAllEvents = () =>
  adminAxios
    .get(`${BASE_URL_HOST_ADMIN_EVENT}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return { message: "Error unknown" };
      }
    });

const getAllCategories = () =>
  adminAxios
    .get(`${BASE_URL_HOST_ADMIN_CATEGORY}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return { message: "Error unknown" };
      }
    });

const productService = {
  getAllMenus,
  getAllEvents,
  getAllCategories,
};
export default productService;
