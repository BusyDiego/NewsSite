import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "http://localhost:8080/";
const TOKEN_KEY = "accessToken";

export const baseInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

baseInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const isLoginRequest = config.url?.includes("/login");
    if (token && !isLoginRequest) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
