// src/services/apiClient.ts
import axios from "axios";
import { AuthService } from "./AuthService";

const API_BASE_URL = "https://localhost:7207/api"; // replace with real URL

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

export default apiClient;
