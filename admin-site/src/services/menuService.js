import api from "../api";
import { getToken } from "../helpers/authHelper";

const authHeaders = () => ({
    accept: "application/json",
    Authorization: getToken(),
});

const handleResponse = (response) => {
    const data = response?.data;
    if (data?.status === "success") return data;
    throw data;
};

const handleError = (error) => {
    throw error?.response ?? error;
};

const request = (config) =>
    api({ ...config, headers: { ...authHeaders(), ...(config.headers || {}) } })
        .then(handleResponse)
        .catch(handleError);

const getAllMenus = (requestURL = "") =>
    request({ method: "GET", url: `/menu${requestURL}` });

const getDetailMenu = (id) =>
    request({ method: "GET", url: `/menu/${id}/detail` });

const editDetailMenu = (id, requestedData) =>
    request({ method: "PUT", url: `/menu/${id}`, data: requestedData });

const editDetailMenuImages = (id, requestedData) =>
    request({
        method: "PATCH",
        url: `/menu/${id}/upload-images`,
        data: requestedData,
    });

const createMenu = (requestedData) =>
    request({ method: "POST", url: "/menu", data: requestedData });

const deleteMenu = (id) => request({ method: "DELETE", url: `/menu/${id}` });

const bulkCreateMenus = (payload) =>
    request({ method: "POST", url: "/menu/bulk", data: payload });

const menuService = {
    getAllMenus,
    getDetailMenu,
    editDetailMenu,
    deleteMenu,
    createMenu,
    editDetailMenuImages,
    bulkCreateMenus,
};

export default menuService;
