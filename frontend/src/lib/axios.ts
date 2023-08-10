import Axios, { InternalAxiosRequestConfig } from "axios";
import { getToken } from "../utils/storage";
import { API_URL } from "../utils/constants";
import useToastStore from "../stores/useToastStore";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      useToastStore.getState().notify({
        success: response.data.success,
        message: response.data.message,
      });
    }
    return response.data;
  },
  (error) => {
    const message = error.response?.data.message || error.message;

    useToastStore.getState().notify({
      success: false,
      message,
    });

    return Promise.reject(error);
  }
);
