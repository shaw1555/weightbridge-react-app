import { type Service } from "./types";
import apiClient from "../../services/apiClient";
// serviceApi.ts

const basePath = "/Service";

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await apiClient.get<Service[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error;
  }
}

export async function fetchServiceById(
  id: string | number
): Promise<Service> {
  try {
    const response = await apiClient.get<Service>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch service with id ${id}:`, error);
    throw error;
  }
}

export async function createService(payload: Service): Promise<Service> {
  try {
    const response = await apiClient.post<Service>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create service:", error);
    throw error;
  }
}

export async function updateService(
  id: string | number,
  payload: Service
): Promise<Service> {
  try {
    const response = await apiClient.put<Service>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update service with id ${id}:`, error);
    throw error;
  }
}

export async function deleteService(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete service with id ${id}:`, error);
    throw error;
  }
}
