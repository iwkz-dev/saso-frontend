import sasoApi from "../api/SasoApi";

const login = (data) => {
    return sasoApi.postData("/customer/user/login", data);
};

const register = (data) => {
    return sasoApi.postData("/customer/user/register", data);
};

const verifyEmail = (token) => {
    return sasoApi.postData(`/customer/user/verify-email/${token}`, {}, true);
};

const checkAuth = () => {
    return sasoApi.getData("/customer/user/check-auth");
};

const logout = () => {
    return sasoApi.postData("/customer/user/logout");
};

const forgotPassword = (data) => {
    return sasoApi.postData("/customer/user/forgot-password", data);
};

const resetPassword = (data, email, token) => {
    return sasoApi.postData(
        `/customer/user/reset-password?token=${token}&email=${email}`,
        data,
    );
};

const requestVerifyEmail = () => {
    return sasoApi.postData("/customer/user/request-verify-email", {}, true);
};

const authService = {
    login,
    register,
    verifyEmail,
    checkAuth,
    logout,
    forgotPassword,
    resetPassword,
    requestVerifyEmail,
};
export default authService;
