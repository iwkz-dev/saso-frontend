import axios from "axios";
import { BASE_URL_HOST } from "../config/config";

class SasoApi {
    constructor() {
        if (SasoApi.instance) {
            return SasoApi.instance;
        }

        this.api = axios.create({
            baseURL: BASE_URL_HOST,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            withCredentials: true, // ✅ IMPORTANT: cookie-based auth
        });

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error("API error:", error?.response || error);
                return Promise.reject(error?.response?.data || error);
            },
        );

        SasoApi.instance = this;
    }

    // -------------------- GET --------------------
    async getData(url, params = {}, useCredentials = true) {
        const res = await this.api.get(url, {
            params,
            withCredentials: useCredentials,
        });
        return res;
    }

    // -------------------- POST --------------------
    async postData(url, data = {}, useCredentials = true) {
        const res = await this.api.post(url, data, {
            withCredentials: useCredentials,
        });
        return res.data;
    }

    // -------------------- PUT --------------------
    async putData(url, data = {}) {
        const res = await this.api.put(url, data);
        return res.data;
    }

    // -------------------- DELETE --------------------
    async deleteData(url) {
        const res = await this.api.delete(url);
        return res.data;
    }
}

export default new SasoApi();
