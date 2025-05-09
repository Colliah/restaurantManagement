import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const instance = axios.create({
  // baseURL: process.env.NODE_ENV !== "production" ? process.env.API_URL : "http://localhost:3000"
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await instance.get("/auth/refresh");
        // Retry the original request
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
