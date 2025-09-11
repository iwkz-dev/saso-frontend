import api from "../api";
import { getToken } from "../helpers/authHelper";

const authHeaders = () => ({
    accept: "application/json",
    Authorization: getToken(),
});

const handleResponse = (response) => {
    const data = response?.data;
    if (data?.status === "success") return data;
    // keep old behavior: reject with response.data when status !== success
    throw data;
};

const handleError = (error) => {
    // keep old behavior: reject with error.response
    throw error?.response ?? error;
};

const request = (config) =>
    api({ ...config, headers: { ...authHeaders(), ...(config.headers || {}) } })
        .then(handleResponse)
        .catch(handleError);

const getAllCategories = () => request({ method: "GET", url: "/category" });

const deleteCategory = (id) =>
    request({ method: "DELETE", url: `/category/${id}` });

const createCategory = (requestedData) =>
    request({ method: "POST", url: "/category", data: requestedData });

const getDetailCategory = (id) =>
    request({ method: "GET", url: `/category/${id}/detail` });

const editDetailCategory = (id, requestedData) =>
    request({ method: "PUT", url: `/category/${id}`, data: requestedData });

const categoryService = {
    getAllCategories,
    deleteCategory,
    createCategory,
    getDetailCategory,
    editDetailCategory,
};

export default categoryService;
