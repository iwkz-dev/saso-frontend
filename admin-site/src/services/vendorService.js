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

const getAllVendors = () => request({ method: "GET", url: "/vendor" });

const deleteVendor = (id) =>
    request({ method: "DELETE", url: `/vendor/${id}` });

const createVendor = (requestedData) =>
    request({ method: "POST", url: "/vendor", data: requestedData });

const getDetailVendor = (id) =>
    request({ method: "GET", url: `/vendor/${id}/detail` });

const editDetailVendor = (id, requestedData) =>
    request({ method: "PUT", url: `/vendor/${id}`, data: requestedData });

const vendorService = {
    getAllVendors,
    deleteVendor,
    createVendor,
    getDetailVendor,
    editDetailVendor,
};

export default vendorService;
