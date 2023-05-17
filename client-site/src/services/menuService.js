import sasoApi from "../api/SasoApi";

const getMenu = (filter) => {
    return sasoApi.getData(`/customer/menu${filter}`);
};
const getMenuWithCategory = (category) => {
    // return sasoApi.postData('/customer/user/register', data);
};

const menuService = {
    getMenu,
    getMenuWithCategory,
};
export default menuService;
