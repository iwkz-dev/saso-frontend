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

const getAllPaymentTypes = () =>
    request({ method: "GET", url: "/payment-type" });

const deletePaymentType = (id) =>
    request({ method: "DELETE", url: `/payment-type/${id}` });

const createPaymentType = (requestedData) =>
    request({ method: "POST", url: "/payment-type", data: requestedData });

const getDetailPaymentType = (id) =>
    request({ method: "GET", url: `/payment-type/${id}/detail` });

const editDetailPaymentType = (id, requestedData) =>
    request({ method: "PUT", url: `/payment-type/${id}`, data: requestedData });

const paymentTypeService = {
    getAllPaymentTypes,
    deletePaymentType,
    createPaymentType,
    getDetailPaymentType,
    editDetailPaymentType,
};

export default paymentTypeService;
