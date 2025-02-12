
import axios from "axios";
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ,
  });
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default API;