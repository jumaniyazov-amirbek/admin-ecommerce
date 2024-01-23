import axios from "axios";
import { API_MODE, domain } from "../constants/urls";

const Axios = axios.create({
  baseURL: `${domain}${API_MODE}`,
});

Axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).tokens.access
    : null;

    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
});

export default Axios;
