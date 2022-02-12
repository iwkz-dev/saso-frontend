import sasoApi from '../api/SasoApi';

const getMenu = () => {
  return sasoApi.getData('/customer/menu');
};
const getMenuWithCategory = category => {
  // return sasoApi.postData('/customer/user/register', data);
};

const menuService = {
  getMenu,
  getMenuWithCategory,
};
export default menuService;
