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

const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .delete(`${BASE_URL_HOST_ADMIN_CATEGORY}/${id}`)
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

const createCategory = (requestedData) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .post(`${BASE_URL_HOST_ADMIN_CATEGORY}`, requestedData)
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

const getDetailCategory = (id) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_CATEGORY}/${id}/detail`)
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

const editDetailCategory = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .put(`${BASE_URL_HOST_ADMIN_CATEGORY}/${id}`, requestedData)
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
    deleteCategory,
    createCategory,
    getDetailCategory,
    editDetailCategory,
};

export default categoryService;
