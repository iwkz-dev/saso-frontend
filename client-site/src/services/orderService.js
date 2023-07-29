import sasoApi from "../api/SasoApi";

const postOrder = (data) => {
    return sasoApi.postData("/customer/order", data);
};

const getOrderList = () => {
    return sasoApi.getData("/customer/order", true);
};

const getOrderDetail = (orderId) => {
    return sasoApi.getData(`/customer/order/${orderId}/detail`, true);
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

const approveOrder = (orderId) => {
    return sasoApi.postData(`/customer/order/${orderId}/approve`);
};

const orderService = {
    postOrder,
    getOrderList,
    getOrderPdf,
    getOrderDetail,
    deleteOrder,
    approveOrder,
};
export default orderService;
