import Axios from 'axios';
import { getToken } from '../helpers/authHelper';

class SasoApi {
  constructor() {
    if (SasoApi.instance != null) {
      return SasoApi.instance;
    }

    Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    Axios.defaults.headers.post['Content-Type'] =
      'application/json;charset=utf-8';
    Axios.defaults.headers.post['Access-Control-Allow-Methods'] =
      'GET,POST,DELETE,PUT';
  }
  getData = async url => {
    try {
      console.log(Axios.defaults.baseURL);
      console.log(url);
      console.log(getToken());
      const res = await Axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      // throw err;
    }
  };
  postData = async (url, data = null) => {
    try {
      const res = await Axios.post(url, data);
      return res.data;
    } catch (err) {
      return err;
    }
  };
  putData = async (url, data = null) => {
    try {
      const res = await Axios.put(url, data);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };
  deleteData = async url => {
    try {
      const res = await Axios.delete(url, data);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };
}

export default new SasoApi();
