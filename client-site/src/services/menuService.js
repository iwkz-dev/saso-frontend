import sasoApi from "../api/SasoApi";

const getMenu = (filter) => {
    return sasoApi.getData(`/customer/menu${filter}`);
};
const getMenuWithCategory = (category) => {
    // return sasoApi.postData('/customer/user/register', data);
};

const getMenuWithBarcode = (barcode) => {
    return sasoApi.getData(`customer/${barcode}/detail-barcode`);
};

const menuService = {
    getMenu,
    getMenuWithBarcode,
};
export default menuService;
