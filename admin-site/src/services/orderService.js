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

const getAllOrders = (requestURL = "") =>
    request({ method: "GET", url: `/order${requestURL}` });

const deleteOrder = (id) => request({ method: "DELETE", url: `/order/${id}` });

const getOrderByInvoiceNumber = (invoiceNumber) =>
    request({
        method: "GET",
        url: `/order/invoiceNumber/${encodeURIComponent(invoiceNumber)}`,
    });

const confirmOrderedMenuStatusByVendors = (orderId, vendorId) =>
    request({
        method: "PATCH",
        url: `/order/${orderId}/vendor/${vendorId}/confirm`,
    });

const changeOrderStatus = (id, status) =>
    request({
        method: "PATCH",
        url: `/order/${id}/${encodeURIComponent(status)}`,
    });

const getOrderById = (id) => request({ method: "GET", url: `/order/${id}` });

const orderService = {
    getAllOrders,
    getOrderById,
    getOrderByInvoiceNumber,
    deleteOrder,
    changeOrderStatus,
    confirmOrderedMenuStatusByVendors,
};

export default orderService;
