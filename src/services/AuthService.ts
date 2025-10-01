// src/services/AuthService.ts
import type { LoginRequest } from "../pages/login/types";

class AuthServiceClass {
  // private _subscribers: ((loggedIn: boolean) => void)[] = [];

  // simulate login API
  async login(data: LoginRequest) {
    // Normally, call your API here
    // For demo, just return a fake token
    const demoUser = {
      username: data.username,
      token: "demo-token-123",
      permissions: [
        "View_Dashboard",
        "View_Category",
        "Create_Category",
        "Update_Category",
        "Delete_Category",
      ],
    };

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
