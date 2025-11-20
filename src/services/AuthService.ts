import type { LoginRequest, LoginResponse } from "../pages/login/types";
import apiClient from "./apiClient";
import axios from "axios";
import { STORAGE_KEYS, WEIGH_DATE } from "../constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const basePathLogin = `${API_BASE_URL}/Login`;
const basePathPermission = "/Permission";

class AuthServiceClass {
  async login(data: LoginRequest) {
    // 🔹 Call backend login API
    const response = await axios.post<LoginResponse>(
      `${basePathLogin}/login`,
      data
    );

    if (!response.data || !response.data.user) {
      // ✅ throw backend error message
      throw new Error("Invalid username or password");
    }

    const { user_id_f, accessToken, refreshToken, user } = response.data;

    const loginUser = {
      username: user.login_account_f,
      accessToken,
      refreshToken,
      permissions: [] as string[],
    };

    // 🔹 Store tokens
    localStorage.setItem(STORAGE_KEYS.TOKEN, loginUser.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, loginUser.refreshToken);

    // 🔹 Fetch permissions only after successful login
    try {
      const perResponse = await apiClient.get<string[]>(
        `${basePathPermission}/PermissionListByUserId/${user_id_f}`
      );
      loginUser.permissions = perResponse.data || [];
    } catch (permError) {
      console.warn("Permission fetch failed:", permError);
    }

    // 🔹 Store user info
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(loginUser));

    return loginUser;
  }

  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) return null;

    try {
      const response = await axios.post(`${basePathLogin}/refresh-token`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

      const userStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      if (userStr) {
        const user = JSON.parse(userStr);
        user.accessToken = accessToken;
        user.refreshToken = newRefreshToken;
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
      }

      return accessToken;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  getUser(): {
    username: string;
    accessToken: string;
    permissions: string[];
  } | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return userStr ? JSON.parse(userStr) : null;
  }

  hasPermission(permission: string): boolean {
    const user = this.getUser();
    return user?.permissions?.includes(permission) ?? false;
  }
}

export const AuthService = new AuthServiceClass();
