import { type User } from "./types";
import apiClient from "../../services/apiClient";
// userApi.ts

const basePath = "/User";

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await apiClient.get<User[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

export async function fetchUserById(
  id: string | number
): Promise<User> {
  try {
    const response = await apiClient.get<User>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user with id ${id}:`, error);
    throw error;
  }
}

export async function createUser(payload: User): Promise<User> {
  try {
    const response = await apiClient.post<User>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
}

export async function updateUser(
  id: string | number,
  payload: User
): Promise<User> {
  try {
    const response = await apiClient.put<User>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update user with id ${id}:`, error);
    throw error;
  }
}

export async function deleteUser(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete user with id ${id}:`, error);
    throw error;
  }
}
