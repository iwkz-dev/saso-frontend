import api from "../api";
import { getToken } from "../helpers/authHelper";

const getAllPaymentTypes = () => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: "/payment-type",
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

const deletePaymentType = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "DELETE",
            url: `/payment-type/${id}`,
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

const createPaymentType = (requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "POST",
            url: `/payment-type`,
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

const getDetailPaymentType = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: `/payment-type/${id}/detail`,
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

const editDetailPaymentType = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "PUT",
            url: `/payment-type/${id}`,
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

const paymentTypeService = {
    getAllPaymentTypes,
    deletePaymentType,
    createPaymentType,
    getDetailPaymentType,
    editDetailPaymentType,
};

export default paymentTypeService;
