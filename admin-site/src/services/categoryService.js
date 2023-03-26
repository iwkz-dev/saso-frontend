import api from "../api";
import { getToken } from "../helpers/authHelper";

const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: "/category",
            headers,
        })
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
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "DELETE",
            url: `/category/${id}`,
            headers,
        })
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
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "POST",
            url: `/category`,
            data: requestedData,
            headers,
        })
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
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: `/category/${id}/detail`,
            headers,
        })
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
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "PUT",
            url: `/category/${id}`,
            data: requestedData,
            headers,
        })
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
