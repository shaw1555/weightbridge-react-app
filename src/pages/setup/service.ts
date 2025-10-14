import { type Setup } from "./types";
import apiClient from "../../services/apiClient";
// setupApi.ts

const basePath = "/Setup";

export async function fetchCategoriesNames(): Promise<string[]> {
  try {
    const response = await apiClient.get<string[]>(`${basePath}/CategoryName`);
    return response.data; // response.data is guaranteed to be string[]
  } catch (error) {
    console.error("Failed to fetch CategoryName:", error);
    throw error;
  }
}

export async function fetchSetups(): Promise<Setup[]> {
  try {
    const response = await apiClient.get<Setup[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch setups:", error);
    throw error;
  }
}

export async function fetchSetupById(
  id: string | number
): Promise<Setup> {
  try {
    const response = await apiClient.get<Setup>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch setup with id ${id}:`, error);
    throw error;
  }
}

export async function createSetup(payload: Setup): Promise<Setup> {
  try {
    const response = await apiClient.post<Setup>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create setup:", error);
    throw error;
  }
}

export async function updateSetup(
  id: string | number,
  payload: Setup
): Promise<Setup> {
  try {
    const response = await apiClient.put<Setup>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update setup with id ${id}:`, error);
    throw error;
  }
}

export async function deleteSetup(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete setup with id ${id}:`, error);
    throw error;
  }
}
