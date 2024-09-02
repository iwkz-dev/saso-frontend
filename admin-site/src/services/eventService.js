import api from "../api";
import { getToken } from "../helpers/authHelper";

const getAllEvents = () => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: `/event`,
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

const deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "DELETE",
            url: `/event/${id}`,
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

const createEvent = (requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "POST",
            url: `/event`,
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

const changeEventStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "PATCH",
            url: `/event/${id}/${status}/change-status`,
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

const changeEventPOClosed = (id, status) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "PATCH",
            url: `/event/${id}/${status}/change-po-closed`,
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

const getDetailEvent = (id) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "GET",
            url: `/event/${id}/detail`,
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

const editDetailEvent = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "PUT",
            url: `/event/${id}`,
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

const editDetailEventImages = (id, requestedData) => {
    return new Promise((resolve, reject) => {
        const headers = {
            accept: "application/JSON",
            Authorization: getToken(),
        };
        api({
            method: "PATCH",
            url: `/event/${id}/upload-images`,
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

const eventService = {
    getAllEvents,
    deleteEvent,
    createEvent,
    getDetailEvent,
    editDetailEventImages,
    editDetailEvent,
    changeEventStatus,
    changeEventPOClosed,
};

export default eventService;
