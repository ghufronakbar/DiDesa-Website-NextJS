import { BASE_URL } from "@/constant";
import { COOKIES_KEY } from "@/constant/keyStore";
import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(COOKIES_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
