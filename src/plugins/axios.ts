import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "@/features/auth/store/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore();

  if (token) {
    if (!config.headers || !(config.headers instanceof AxiosHeaders)) {
      config.headers = new AxiosHeaders(config.headers);
    }

    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});
