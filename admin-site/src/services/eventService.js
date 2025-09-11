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

const getAllEvents = () => request({ method: "GET", url: "/event" });

const deleteEvent = (id) => request({ method: "DELETE", url: `/event/${id}` });

const createEvent = (requestedData) =>
    request({ method: "POST", url: "/event", data: requestedData });

const changeEventStatus = (id, status) =>
    request({ method: "PATCH", url: `/event/${id}/${status}/change-status` });

const changeEventPOClosed = (id, status) =>
    request({
        method: "PATCH",
        url: `/event/${id}/${status}/change-po-closed`,
    });

const getDetailEvent = (id) =>
    request({ method: "GET", url: `/event/${id}/detail` });

const editDetailEvent = (id, requestedData) =>
    request({ method: "PUT", url: `/event/${id}`, data: requestedData });

const editDetailEventImages = (id, requestedData) =>
    request({
        method: "PATCH",
        url: `/event/${id}/upload-images`,
        data: requestedData,
        headers:
            typeof FormData !== "undefined" && requestedData instanceof FormData
                ? {
                      /* no Content-Type override */
                  }
                : undefined,
    });

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
