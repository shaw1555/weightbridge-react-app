import { type Category } from "./types";
import apiClient from "../../services/apiClient";
// categoryApi.ts

const basePath = "/Category";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Category[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

export async function fetchCategoryById(
  id: string | number
): Promise<Category> {
  try {
    const response = await apiClient.get<Category>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}:`, error);
    throw error;
  }
}

export async function createCategory(payload: Category): Promise<Category> {
  try {
    const response = await apiClient.post<Category>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw error;
  }
}

export async function updateCategory(
  id: string | number,
  payload: Category
): Promise<Category> {
  try {
    const response = await apiClient.put<Category>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update category with id ${id}:`, error);
    throw error;
  }
}

export async function deleteCategory(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete category with id ${id}:`, error);
    throw error;
  }
}
