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

const getAllUsers = (requestURL = "") =>
    request({ method: "GET", url: `/user${requestURL}` });

const getDetailUser = (id) =>
    request({ method: "GET", url: `/user/${id}/detail` });

const editDetailUser = (id, requestedData) =>
    request({ method: "PUT", url: `/user/${id}`, data: requestedData });

const createUser = (requestedData) =>
    request({ method: "POST", url: "/user/create", data: requestedData });

const deleteUser = (id) => request({ method: "DELETE", url: `/user/${id}` });

const userService = {
    getAllUsers,
    getDetailUser,
    createUser,
    deleteUser,
    editDetailUser,
};

export default userService;
