import sasoApi from '../api/SasoApi';

const postOrder = data => {
  return sasoApi.postData('/customer/order', data);
};

const orderService = {
  postOrder,
};
export default orderService;
