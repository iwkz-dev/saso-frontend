import sasoApi from "../api/SasoApi";

const getCategory = (filter) => {
    return sasoApi.getData(`/customer/category${filter}`);
};

const categoryService = {
    getCategory,
};
export default categoryService;
