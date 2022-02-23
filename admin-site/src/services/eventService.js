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

const getAllEvents = () => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_EVENT}`)
            .then((response) => {
                if (response.data.status === "success") {
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

const eventService = {
    getAllEvents,
};

export default eventService;
