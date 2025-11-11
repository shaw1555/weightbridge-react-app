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

// ✅ Flag to prevent multiple refresh requests at once
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 🔹 Attach access token to every request
apiClient.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Global response interceptor with refresh logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ If token expired (401) and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for ongoing refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await AuthService.refreshToken();

        if (!newToken) {
          throw new Error("Failed to refresh token");
        }

        processQueue(null, newToken);
        // ✅ Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        AuthService.logout();

        //   // Optional: redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 🔹 Handle other errors normally
    const message =
      error.response?.data?.title || // ProblemDetails style
      error.response?.data?.message ||
      (typeof error.response?.data === "string"
        ? error.response?.data
        : null) ||
      error.message ||
      "An unexpected error occurred";

    const shortMessage =
      message?.length > 200 ? message.substring(0, 200) + "..." : message;

    globalShowPopup(shortMessage, "Error");
    console.error("API error:", message);

    return Promise.reject(error);
  }
);

export default apiClient;
