import axios from "axios";
import { BASE_URL_HOST_ADMIN_ORDER } from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
    accept: "application/JSON",
    Authorization: getToken(),
};

const adminAxios = axios.create({
    headers,
});

const getAllOrders = (requestURL = "") => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_ORDER}${requestURL}`)
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

const deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .delete(`${BASE_URL_HOST_ADMIN_ORDER}/${id}`)
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

const orderService = {
    getAllOrders,
    deleteOrder,
};
export default orderService;
