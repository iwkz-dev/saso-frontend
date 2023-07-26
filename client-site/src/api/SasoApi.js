import Axios from "axios";
import { BASE_URL_HOST } from "../config/config";
import { getContentType, getToken } from "../helpers/authHelper";

class SasoApi {
    constructor() {
        if (SasoApi.instance != null) {
            return SasoApi.instance;
        }

        //Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
        Axios.defaults.baseURL = BASE_URL_HOST;
        Axios.defaults.headers.post["Content-Type"] =
            "application/json;charset=utf-8";
        Axios.defaults.headers.post["Access-Control-Allow-Methods"] =
            "GET,POST,DELETE,PUT";
    }
    getData = async (url, withAuth = false) => {
        try {
            if (withAuth) {
                const res = await Axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + getToken(),
                    },
                });
                return res;
            } else {
                const res = await Axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            }
        } catch (err) {
            console.log(err);
            // throw err;
        }
    };
    postData = async (
        url,
        data = null,
        contentType = "",
        responseType = "",
    ) => {
        try {
            const res = await Axios.post(url, data, {
                headers: {
                    "content-type": getContentType(contentType),
                    Authorization: "Bearer " + getToken(),
                },
                responseType
            });
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
    deleteData = async (url) => {
        try {
            const res = await Axios.delete(url, data);
            return res.data;
        } catch (err) {
            throw err.response.data;
        }
    };
}

export default new SasoApi();
