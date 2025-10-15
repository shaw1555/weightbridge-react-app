import { type WeighingCompanyProfile } from "./types";
import apiClient from "../../services/apiClient";
// weighingCompanyProfileApi.ts

const basePath = "/WeighingCompanyProfile";

export async function fetchWeighingCompanyProfiles(): Promise<WeighingCompanyProfile[]> {
  try {
    const response = await apiClient.get<WeighingCompanyProfile[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch weighingCompanyProfiles:", error);
    throw error;
  }
}

export async function fetchWeighingCompanyProfileById(
  id: string | number
): Promise<WeighingCompanyProfile> {
  try {
    const response = await apiClient.get<WeighingCompanyProfile>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch weighingCompanyProfile with id ${id}:`, error);
    throw error;
  }
}

export async function createWeighingCompanyProfile(payload: WeighingCompanyProfile): Promise<WeighingCompanyProfile> {
  try {
    const response = await apiClient.post<WeighingCompanyProfile>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create weighingCompanyProfile:", error);
    throw error;
  }
}

export async function updateWeighingCompanyProfile(
  id: string | number,
  payload: WeighingCompanyProfile
): Promise<WeighingCompanyProfile> {
  try {
    const response = await apiClient.put<WeighingCompanyProfile>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update weighingCompanyProfile with id ${id}:`, error);
    throw error;
  }
}

export async function deleteWeighingCompanyProfile(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete weighingCompanyProfile with id ${id}:`, error);
    throw error;
  }
}
