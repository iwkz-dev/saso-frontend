import axios from "axios";
import { BASE_URL_HOST_ADMIN_MENU } from "../config/config";
import { getToken } from "../helpers/authHelper";

const headers = {
  accept: "application/JSON",
  Authorization: getToken(),
};

const adminAxios = axios.create({
  headers,
});

const getAllMenus = (requestURL = "") => {
  return new Promise((resolve, reject) => {
    adminAxios
      .get(`${BASE_URL_HOST_ADMIN_MENU}${requestURL}`)
      .then((response) => {
        if (response.data.status === "success") {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const getDetailMenu = (id) => {
  return new Promise((resolve, reject) => {
    adminAxios
      .get(`${BASE_URL_HOST_ADMIN_MENU}/${id}/detail`)
      .then((response) => {
        if (response.data.status === "success") {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const editDetailMenu = (id, requestedData) => {
  return new Promise((resolve, reject) => {
    adminAxios
      .put(`${BASE_URL_HOST_ADMIN_MENU}/${id}`, requestedData)
      .then((response) => {
        if (response.data.status === "success") {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const createMenu = (requestedData) => {
  return new Promise((resolve, reject) => {
    adminAxios
      .post(`${BASE_URL_HOST_ADMIN_MENU}`, requestedData)
      .then((response) => {
        if (response.data.status === "success") {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const deleteMenu = (id) => {
  return new Promise((resolve, reject) => {
    adminAxios
      .delete(`${BASE_URL_HOST_ADMIN_MENU}/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const menuService = {
  getAllMenus,
  getDetailMenu,
  editDetailMenu,
  deleteMenu,
  createMenu,
};
export default menuService;
