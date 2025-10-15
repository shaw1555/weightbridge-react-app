import { type TruckType } from "./types";
import apiClient from "../../services/apiClient";
// truckTypeApi.ts

const basePath = "/TruckType";

export async function fetchTruckTypes(): Promise<TruckType[]> {
  try {
    const response = await apiClient.get<TruckType[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch truckTypes:", error);
    throw error;
  }
}

export async function fetchTruckTypeById(
  id: string | number
): Promise<TruckType> {
  try {
    const response = await apiClient.get<TruckType>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch truckType with id ${id}:`, error);
    throw error;
  }
}

export async function createTruckType(payload: TruckType): Promise<TruckType> {
  try {
    const response = await apiClient.post<TruckType>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create truckType:", error);
    throw error;
  }
}

export async function updateTruckType(
  id: string | number,
  payload: TruckType
): Promise<TruckType> {
  try {
    const response = await apiClient.put<TruckType>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update truckType with id ${id}:`, error);
    throw error;
  }
}

export async function deleteTruckType(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete truckType with id ${id}:`, error);
    throw error;
  }
}
