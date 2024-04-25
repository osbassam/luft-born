import axios from 'axios';
import { useAuthStore } from '../stores/auth';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

api.interceptors.request.use((config) => {
    const authStore = useAuthStore(); // Access the store inside the interceptor
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

export default api;