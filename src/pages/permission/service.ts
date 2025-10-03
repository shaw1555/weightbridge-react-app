import type {  Permission, User } from "./types";
import apiClient from "../../services/apiClient";
// permissionApi.ts

const basePathPermission = "/Permission";

const basePathUser = "/User";

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await apiClient.get<User[]>(`${basePathUser}`);
    return response.data; // response.data is guaranteed to be string[]
  } catch (error) {
    console.error("Failed to fetch Users:", error);
    throw error;
  }
}

export async function fetchPermissionFormNames(): Promise<string[]> {
  try {
    const response = await apiClient.get<string[]>(`${basePathPermission}/PermissionFormName`);
    return response.data; // response.data is guaranteed to be string[]
  } catch (error) {
    console.error("Failed to fetch PermissionFormNames:", error);
    throw error;
  }
}


export async function fetchPermissions(): Promise<Permission[]> {
  try {
    const response = await apiClient.get<Permission[]>(basePathPermission);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch permissions:", error);
    throw error;
  }
}

export async function fetchPermissionById(
  id: string | number
): Promise<Permission> {
  try {
    const response = await apiClient.get<Permission>(`${basePathPermission}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch permission with id ${id}:`, error);
    throw error;
  }
}

export async function createPermission(payload: Permission): Promise<Permission> {
  try {
    const response = await apiClient.post<Permission>(basePathPermission, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create permission:", error);
    throw error;
  }
}

export async function updatePermission(
  id: string | number,
  payload: Permission
): Promise<Permission> {
  try {
    const response = await apiClient.put<Permission>(
      `${basePathPermission}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update permission with id ${id}:`, error);
    throw error;
  }
}

export async function deletePermission(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePathPermission}/${id}`);
  } catch (error) {
    console.error(`Failed to delete permission with id ${id}:`, error);
    throw error;
  }
}
