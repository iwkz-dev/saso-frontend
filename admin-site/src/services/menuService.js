import axios from "axios";
import { BASE_URL_HOST_ADMIN_MENU } from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
  accept: "application/JSON",
  Authorization: getToken(),
};

const adminAxios = axios.create({
  headers,
});

const getAllMenus = (requestURL = "") =>
  adminAxios
    .get(`${BASE_URL_HOST_ADMIN_MENU}${requestURL}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return { message: "Error unknown" };
      }
    });

const getDetailMenu = (id) =>
  adminAxios
    .get(`${BASE_URL_HOST_ADMIN_MENU}/${id}/detail`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return { message: "Error unknown" };
      }
    });

const editDetailMenu = (id, requestedData) =>
  adminAxios
    .put(`${BASE_URL_HOST_ADMIN_MENU}/${id}`, requestedData)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return { message: "Error unknown" };
      }
    });

const menuService = {
  getAllMenus,
  getDetailMenu,
  editDetailMenu,
};
export default menuService;
