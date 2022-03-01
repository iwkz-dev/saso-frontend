import axios from "axios";
import { BASE_URL_HOST_ADMIN_EVENT } from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
    accept: "application/JSON",
    Authorization: getToken(),
};

const adminAxios = axios.create({
    headers,
});

const getAllEvents = () => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_EVENT}`)
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

const deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .delete(`${BASE_URL_HOST_ADMIN_EVENT}/${id}`)
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

const createEvent = (requestedData) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .post(`${BASE_URL_HOST_ADMIN_EVENT}`, requestedData)
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

const getDetailEvent = (id) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .get(`${BASE_URL_HOST_ADMIN_EVENT}/${id}/detail`)
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

const editDetailEvent = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .put(`${BASE_URL_HOST_ADMIN_EVENT}/${id}`, requestedData)
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

const editDetailEventImages = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        adminAxios
            .patch(
                `${BASE_URL_HOST_ADMIN_EVENT}/${id}/upload-images`,
                requestedData,
            )
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

const eventService = {
    getAllEvents,
    deleteEvent,
    createEvent,
    getDetailEvent,
    editDetailEventImages,
    editDetailEvent,
};

export default eventService;
