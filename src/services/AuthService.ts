// src/services/AuthService.ts
import type { LoginRequest } from "../pages/login/types";
import apiClient from "./apiClient";
import {STORAGE_KEYS} from "../constants";

class AuthServiceClass {
  // private _subscribers: ((loggedIn: boolean) => void)[] = [];

  // simulate login API
  async login(data: LoginRequest) {
    const basePathPermission = "/Permission";

    // Normally, call your API here
    // For demo, just return a fake token
    const demoUser = {
      username: data.username,
      token: "demo-token-123",
      permissions: [] as string[],
    };

    // 🔹 Fetch permissions from API
    try {
      const response = await apiClient.get<string[]>(
        // `${basePathPermission}/GrantPermission` // temporary use before auth// 
        // to update with login user id on later.. // 
         `${basePathPermission}/PermissionListByUserId/45`
      );
      demoUser.permissions = response.data; // assign permissions
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }

    localStorage.setItem(STORAGE_KEYS.TOKEN, demoUser.token);
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(demoUser));
 

    return demoUser;
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  getUser(): { username: string; token: string; permissions: string[] } | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return userStr ? JSON.parse(userStr) : null;
  }

  hasPermission(permission: string): boolean {
    const user = this.getUser();
    return user?.permissions?.includes(permission) ?? false;
  }
}

export const AuthService = new AuthServiceClass();
