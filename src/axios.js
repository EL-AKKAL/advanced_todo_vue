import axios from "axios";
import store from "./store";
// barryvdh/laravel-cors
const axiosClient = axios.create({
     baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
     withCredentials: true,
});
axiosClient.interceptors.request.use((config) => {
     config.headers.Authorization = `Bearer ${store.state.user.token}`;
     return config;
});

export default axiosClient;
