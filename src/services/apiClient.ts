// src/services/apiClient.ts
import axios from "axios";
import { AuthService } from "./AuthService"; 

// If your interceptor is outside a component, you can export a function to set showPopup
let globalShowPopup: (msg: string, title?: string) => void = () => {};

export const setGlobalPopup = (fn: typeof globalShowPopup) => {
  globalShowPopup = fn;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
apiClient.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Global response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Show toast for successful responses

    return response;
  },
  (error) => {
    // Extract backend message
    const message =
      error.response?.data?.title || // ProblemDetails style
      error.response?.data || // simple string
      error.message || // fallback
      "An unexpected error occurred";

    // Show alert popup instead of toast
    // window.alert(message);

    const shortMessage =
      message?.length > 200 ? message.substring(0, 200) + "..." : message;

    globalShowPopup(shortMessage, "Error");

    // Optionally log to console or service
    console.error("API error:", message);

    // Reject to allow further handling if needed
    return Promise.reject(error);
  }
);

export default apiClient;
