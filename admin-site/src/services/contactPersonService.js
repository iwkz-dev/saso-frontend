import api from "../api";
import { getToken } from "../helpers/authHelper";

const getAllContactPerson = () => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: "/contact-person",
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

const deleteContactPerson = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "DELETE",
            url: `/contact-person/${id}`,
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

const createContactPerson = (requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "POST",
            url: `/contact-person`,
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

const getDetailContactPerson = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: `/contact-person/${id}/detail`,
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

const editDetailContactPerson = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "PUT",
            url: `/contact-person/${id}`,
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

const contactPersonService = {
    getAllContactPerson,
    deleteContactPerson,
    createContactPerson,
    getDetailContactPerson,
    editDetailContactPerson,
};

export default contactPersonService;
