import axios from "axios";
import { BASE_URL_HOST_ADMIN_MENU } from "../config/config";
import { getToken } from "../helpers/auth";

const headers = {
  accept: "application/JSON",
  access_token: getToken(),
};

const adminAxios = axios.create({
  headers,
});

const getAllProducts = () =>
  adminAxios
    .get(`${BASE_URL_HOST_ADMIN_MENU}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

const product = {
  getAllProducts,
};
export default product;
