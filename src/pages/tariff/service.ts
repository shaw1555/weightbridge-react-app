import { type Tariff } from "./types";
import apiClient from "../../services/apiClient";
// tariffApi.ts

const basePath = "/Tariff";

export async function fetchTariffs(): Promise<Tariff[]> {
  try {
    const response = await apiClient.get<Tariff[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tariffs:", error);
    throw error;
  }
}

export async function fetchTariffById(
  id: string | number
): Promise<Tariff> {
  try {
    const response = await apiClient.get<Tariff>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch tariff with id ${id}:`, error);
    throw error;
  }
}

export async function createTariff(payload: Tariff): Promise<Tariff> {
  try {
    const response = await apiClient.post<Tariff>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create tariff:", error);
    throw error;
  }
}

export async function updateTariff(
  id: string | number,
  payload: Tariff
): Promise<Tariff> {
  try {
    const response = await apiClient.put<Tariff>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update tariff with id ${id}:`, error);
    throw error;
  }
}

export async function deleteTariff(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete tariff with id ${id}:`, error);
    throw error;
  }
}
