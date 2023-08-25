import sasoApi from "../api/SasoApi";

const postOrder = (data) => {
    return sasoApi.postData("/customer/order", data);
};

const postOrderGuest = (data) => {
    return sasoApi.postData("/customer/order-guest", data);
};

const getOrderList = () => {
    return sasoApi.getData("/customer/order", true);
};

const getOrderDetail = (orderId) => {
    return sasoApi.getData(`/customer/order/${orderId}/detail`, true);
};

const getOrderDetailByInvoiceNumber = (data) => {
    return sasoApi.getData(
        `/customer/order-guest/search-order/?invoiceNumber=${data.invoiceNumber}&customerFullname=${data.customerFullname}`,
    );
};

const getOrderPdf = (orderId) => {
    return sasoApi.postData(
        `/customer/order/${orderId}/generatePdf`,
        true,
        "text/html; charset=utf-8",
        "blob",
    );
};

const deleteOrder = (orderId) => {
    return sasoApi.deleteData(`/customer/order/${orderId}`, orderId);
};

const approveOrder = (data) => {
    return sasoApi.postData(`/customer/order/approve`, data);
};

const approveOrderGuest = (data) => {
    return sasoApi.postData(`/customer/order-guest/approve-guest`, data);
};

const orderService = {
    postOrder,
    getOrderList,
    getOrderPdf,
    getOrderDetail,
    deleteOrder,
    approveOrder,
    approveOrderGuest,
    postOrderGuest,
    getOrderDetailByInvoiceNumber,
};
export default orderService;
