import { type WeighGateInOut } from "./types";
import apiClient from "../../services/apiClient";
// weighGateInOutApi.ts

const basePath = "/WeighGateInOut";

export async function fetchWeighGateInOuts(
  fromDate: string,
  toDate: string
): Promise<WeighGateInOut[]> {
  try {
    const response = await apiClient.get<WeighGateInOut[]>(basePath, {
      params: {
        fromDate,
        toDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch weighGateInOuts:", error);
    throw error;
  }
}

export async function fetchWeighGateInOutById(
  id: string | number
): Promise<WeighGateInOut> {
  try {
    const response = await apiClient.get<WeighGateInOut>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch weighGateInOut with id ${id}:`, error);
    throw error;
  }
}

export async function createWeighGateInOut(
  payload: WeighGateInOut
): Promise<WeighGateInOut> {
  try {
    const response = await apiClient.post<WeighGateInOut>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create weighGateInOut:", error);
    throw error;
  }
}

export async function updateWeighGateInOut(
  id: string | number,
  payload: WeighGateInOut
): Promise<WeighGateInOut> {
  try {
    const response = await apiClient.put<WeighGateInOut>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update weighGateInOut with id ${id}:`, error);
    throw error;
  }
}

export async function deleteWeighGateInOut(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete weighGateInOut with id ${id}:`, error);
    throw error;
  }
}
