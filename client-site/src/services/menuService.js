import sasoApi from "../api/SasoApi";

const getMenu = (filter) => {
    return sasoApi.getData(`/customer/menu${filter}`);
};

const getMenuWithBarcode = (barcode) => {
    return sasoApi.getData(`customer/${barcode}/detail-barcode`);
};

const getMenuWithId = (id) => {
    return sasoApi.getData(`customer/menu/${id}/detail`);
};

const menuService = {
    getMenu,
    getMenuWithBarcode,
    getMenuWithId,
};
export default menuService;
