// components/Permission.tsx
import React from "react";
import { AuthService } from "../services/AuthService";

interface PermissionProps {
  permission: string;
  children: React.ReactNode;
}

const Permission: React.FC<PermissionProps> = ({ permission, children }) => {
  if (!AuthService.hasPermission(permission)) {
    return null; // hide if no permission
  }

  return <>{children}</>;
};

export default Permission;
