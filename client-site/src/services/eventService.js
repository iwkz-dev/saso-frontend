import sasoApi from "../api/SasoApi";

const getEvent = (status) =>
    sasoApi.getData(`/customer/event${status ? `?status=${status}` : ""}`);

export default { getEvent };
