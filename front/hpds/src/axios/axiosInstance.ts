import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../consts/consts';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(function (config) {
    // TODO Add token to Authorization Header

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axiosInstance;