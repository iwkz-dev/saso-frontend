import axios from "axios";
import { BASE_URL_HOST } from "../config/config";

const login = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL_HOST}/auth/login`, data);

        const role = response?.data?.data?.role;
        const ok = (response?.status === 200 && role === 1) || role === 2;

        if (ok) {
            return response.data;
        }

        throw { data: { message: "Email / Password is wrong" } };
    } catch (error) {
        throw error?.response ?? error;
    }
};

const authService = { login };
export default authService;
