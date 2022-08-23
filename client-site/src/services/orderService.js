import sasoApi from '../api/SasoApi';

const postOrder = data => {
  return sasoApi.postData('/customer/order', data);
};

const getOrderList = () => {
  return sasoApi.getData('/customer/order', true);
};

const getOrderPdf = orderId => {
  return sasoApi.postData(`/customer/order/${orderId}/generatePdf`);
};

const orderService = {
  postOrder,
  getOrderList,
  getOrderPdf,
};
export default orderService;
