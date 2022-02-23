import axios from "axios";
import { BASE_URL_HOST_ADMIN_CATEGORY } from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
    accept: "application/JSON",
    Authorization: getToken(),
};

const adminAxios = axios.create({
    headers,
});

const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_CATEGORY}`)
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

const categoryService = {
    getAllCategories,
};

export default categoryService;
