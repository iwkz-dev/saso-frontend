import sasoApi from '../api/SasoApi';

const login = data => {
  return sasoApi.postData('/auth/login', data);
};
const register = data => {
  return sasoApi.postData('/customer/user/register', data);
};

const auth = {
  login,
  register,
};
export default auth;
