import axios from "axios";
import { BASE_URL_HOST_ADMIN } from "../config/config";

const sasoApi = axios.create({
    baseURL: `${BASE_URL_HOST_ADMIN}`,
});

export default sasoApi;
