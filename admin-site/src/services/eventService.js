import axios from "axios";
import { BASE_URL_HOST_ADMIN_EVENT } from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
  accept: "application/JSON",
  Authorization: getToken(),
};

const adminAxios = axios.create({
  headers,
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

const eventService = {
  getAllEvents,
};

export default eventService;
