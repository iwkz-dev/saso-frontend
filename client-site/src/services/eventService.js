import sasoApi from "../api/SasoApi";

function getEvent(status) {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return sasoApi.getData(`/customer/event${query}`);
}

function getEventBySlug(slug) {
    return sasoApi.getData(`/customer/event/${slug}`);
}

export default { getEvent, getEventBySlug };
