import sasoApi from "../api/SasoApi";

const toQuery = (filter) => {
    if (!filter) return "";
    if (typeof filter === "string") return filter.startsWith("?") ? filter : `?${filter}`;
    const qs = new URLSearchParams(filter).toString();
    return qs ? `?${qs}` : "";
};

const getMenu = (filter) => {
    return sasoApi.getData(`/customer/menu${toQuery(filter)}`);
};

const getMenuWithBarcode = (barcode) => {
    return sasoApi.getData(`/customer/${barcode}/detail-barcode`);
};

const getMenuWithId = (id) => {
    return sasoApi.getData(`/customer/menu/${id}/detail`);
};

export default {
    getMenu,
    getMenuWithId,
    getMenuWithBarcode,
};
