import axios from "axios";
import {BASE_URL_HOST} from "../config/config";

export const submitLogin = (data)=>{
    axios.post(`${BASE_URL_HOST}/auth/login`, data)
        .then(response => {
            if(response.data.status==="success"){
                /*
                Create object for required data
                 */
                //console.log("accessToken", response.data.data.accessToken);
                sessionStorage.setItem("accessToken", response.data.data.accessToken);
            }

        })
        .catch(error => console.log(error));
}
