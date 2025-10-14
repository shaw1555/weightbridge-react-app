// src/services/AuthService.ts
import type { LoginRequest } from "../pages/login/types";
import apiClient from "./apiClient";

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
        `${basePathPermission}/GrantPermission`
      );
      demoUser.permissions = response.data; // assign permissions
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }

    localStorage.setItem("token", demoUser.token);
    localStorage.setItem("user", JSON.stringify(demoUser));

    return demoUser;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUser(): { username: string; token: string; permissions: string[] } | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  hasPermission(permission: string): boolean {
    const user = this.getUser();
    return user?.permissions?.includes(permission) ?? false;
  }
}

export const AuthService = new AuthServiceClass();
