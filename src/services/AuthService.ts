import type { LoginRequest, LoginResponse } from "../pages/login/types";
import apiClient from "./apiClient";
import { STORAGE_KEYS } from "../constants";

const basePathLogin = "/Login";
const basePathPermission = "/Permission";

class AuthServiceClass {
  async login(data: LoginRequest) {
    try {
      // 🔹 Call backend login API
      const response = await apiClient.post<LoginResponse>(
        `${basePathLogin}/login`,
        data
      );

      if (!response.data || !response.data.user) {
        throw new Error("Invalid response from server.");
      }

      const { user_id_f, accessToken, refreshToken, user } = response.data;

      const loginUser = {
        username: user.login_account_f,
        accessToken,
        refreshToken,
        permissions: [] as string[],
      };

      // 🔹 Fetch permissions
      try {
        const perResponse = await apiClient.get<string[]>(
          `${basePathPermission}/PermissionListByUserId/${user_id_f}`
        );
        loginUser.permissions = perResponse.data || [];
      } catch (permError) {
        console.warn("Permission fetch failed:", permError);
      }

      // 🔹 Store tokens and user info
      localStorage.setItem(STORAGE_KEYS.TOKEN, loginUser.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, loginUser.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(loginUser));

      return loginUser;
    } catch (error: any) {
      console.error("Login failed:", error);

      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Invalid username or password.";
        throw new Error(message);
      } else if (error.request) {
        throw new Error(
          "Cannot connect to the server. Please try again later."
        );
      } else {
        throw new Error(error.message || "Unexpected error occurred.");
      }
    }
  }

  // ✅ NEW: Refresh token API call
  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) return null;

    try {
      const response = await apiClient.post(`${basePathLogin}/refresh-token`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // ✅ Save new tokens
      localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

      // ✅ Also update in user info (if exists)
      const userStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      if (userStr) {
        const user = JSON.parse(userStr);
        user.accessToken = accessToken;
        user.refreshToken = newRefreshToken;
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
      }

      console.log("🔁 Token refreshed successfully");
      return accessToken;
    } catch (error: any) {
      console.error("Refresh token failed:", error);
      this.logout(); // Clear storage if refresh fails
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
