import api from "../api";
import { getToken } from "../helpers/authHelper";

const authHeaders = () => ({
    accept: "application/json",
    Authorization: getToken(),
});

const handleResponse = (response) => {
    const data = response?.data;
    if (data?.status === "success") return data;
    // Keep old behavior: reject with response.data when status !== success
    throw data;
};

const handleError = (error) => {
    // Keep old behavior: reject with error.response
    throw error?.response ?? error;
};

const request = (config) =>
    api({ ...config, headers: { ...authHeaders(), ...(config.headers || {}) } })
        .then(handleResponse)
        .catch(handleError);

const getAllContactPerson = () => request({ method: "GET", url: "/contact-person" });

const deleteContactPerson = (id) =>
    request({ method: "DELETE", url: `/contact-person/${id}` });

const createContactPerson = (requestedData) =>
    request({ method: "POST", url: "/contact-person", data: requestedData });

const getDetailContactPerson = (id) =>
    request({ method: "GET", url: `/contact-person/${id}/detail` });

const editDetailContactPerson = (id, requestedData) =>
    request({ method: "PUT", url: `/contact-person/${id}`, data: requestedData });

const contactPersonService = {
    getAllContactPerson,
    deleteContactPerson,
    createContactPerson,
    getDetailContactPerson,
    editDetailContactPerson,
};

export default contactPersonService;
