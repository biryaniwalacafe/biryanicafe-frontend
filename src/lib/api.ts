import axios from 'axios';
import { useAuthStore } from './store/authStore';

//const API_URL = "http://localhost:8000/api";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// This interceptor runs before every request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// This interceptor runs after every response
api.interceptors.response.use(
  (response) => response, // If the response is successful, do nothing.
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and we haven't already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark to prevent infinite loops
      
      const refreshToken = useAuthStore.getState().refreshToken;
      if (!refreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      try {
        // Attempt to get a new access token using the refresh token
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        
        // Update the auth store with the new access token
        useAuthStore.getState().setAccessToken(access);

        // Update the header of the original request and retry it
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error("Token refresh failed, logging out.", refreshError);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
