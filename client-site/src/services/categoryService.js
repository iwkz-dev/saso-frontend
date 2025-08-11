import sasoApi from "../api/SasoApi";

const toQuery = (filter) => {
    if (!filter) return "";
    if (typeof filter === "string") return filter.startsWith("?") ? filter : `?${filter}`;
    const qs = new URLSearchParams(filter).toString();
    return qs ? `?${qs}` : "";
};

const getCategory = (filter) => {
    return sasoApi.getData(`/customer/category${toQuery(filter)}`);
};

export default { getCategory };