import axios from "axios";
import { BASE_URL_HOST_ADMIN_USER } from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
    accept: "application/JSON",
    Authorization: getToken(),
};

const adminAxios = axios.create({
    headers,
});

const getAllUsers = (requestURL = "") => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_USER}${requestURL}`)
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

const getDetailUser = (id) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_USER}/${id}/detail`)
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

const editDetailUser = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .put(`${BASE_URL_HOST_ADMIN_USER}/${id}`, requestedData)
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

const createUser = (requestedData) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .post(`${BASE_URL_HOST_ADMIN_USER}`, requestedData)
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

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .delete(`${BASE_URL_HOST_ADMIN_USER}/${id}`)
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

const userService = {
    getAllUsers,
    getDetailUser,
    createUser,
    deleteUser,
    editDetailUser,
};
export default userService;
