import sasoApi from '../api/SasoApi';

const login = data => {
  return sasoApi.postData('/auth/login', data);
};

const auth = {
  login,
};
export default auth;
