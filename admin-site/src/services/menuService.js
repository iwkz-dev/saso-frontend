import api from "../api";
import { getToken } from "../helpers/authHelper";

const getAllMenus = (requestURL = "") => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };

        api({
            method: "GET",
            url: `/menu${requestURL}`,
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

const getDetailMenu = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };

        api({
            method: "GET",
            url: `/menu/${id}/detail`,
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

const editDetailMenu = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };

        api({
            method: "PUT",
            url: `/menu/${id}`,
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

const editDetailMenuImages = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };

        api({
            method: "PATCH",
            url: `/menu/${id}/upload-images`,
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

const createMenu = (requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };

        api({
            method: "POST",
            url: `/menu`,
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

const deleteMenu = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };

        api({
            method: "DELETE",
            url: `/menu/${id}`,
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

const menuService = {
    getAllMenus,
    getDetailMenu,
    editDetailMenu,
    deleteMenu,
    createMenu,
    editDetailMenuImages,
};
export default menuService;
