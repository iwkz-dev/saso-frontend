import Axios from "axios";
import { BASE_URL_HOST } from "../config/config";
import { getContentType, getToken } from "../helpers/authHelper";

class SasoApi {
    constructor() {
        if (SasoApi.instance) {
            return SasoApi.instance;
        }

        Axios.defaults.baseURL = BASE_URL_HOST;
        Axios.defaults.headers.post["Content-Type"] =
            "application/json;charset=utf-8";
        Axios.defaults.headers.post["Access-Control-Allow-Methods"] =
            "GET,POST,DELETE,PUT";

        SasoApi.instance = this;
    }

    async getData(url, withAuth = false) {
        try {
            const headers = {
                "Content-Type": "application/json",
            };
            if (withAuth) {
                headers.Authorization = `Bearer ${getToken()}`;
            }
            const res = await Axios.get(url, { headers });
            return res;
        } catch (err) {
            console.error("GET request error:", err);
            throw (err && err.response && err.response.data) || err;
        }
    }

    async postData(url, data = null, contentType = "", responseType = "") {
        try {
            const res = await Axios.post(url, data, {
                headers: {
                    "Content-Type": getContentType(contentType),
                    Authorization: `Bearer ${getToken()}`,
                },
                responseType,
            });
            return res.data;
        } catch (err) {
            console.error("POST request error:", err);
            throw (err && err.response && err.response.data) || err;
        }
    }

    async putData(url, data = null) {
        try {
            const res = await Axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return res.data;
        } catch (err) {
            console.error("PUT request error:", err);
            throw (err && err.response && err.response.data) || err;
        }
    }

    async deleteData(url, contentType = "") {
        try {
            const res = await Axios.delete(url, {
                headers: {
                    "Content-Type": getContentType(contentType),
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return res.data;
        } catch (err) {
            console.error("DELETE request error:", err);
            throw (err && err.response && err.response.data) || err;
        }
    }
}

export default new SasoApi();
