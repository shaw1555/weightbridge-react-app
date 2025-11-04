import type {  ServiceCategoryMapping, Service, Category } from "./types";
import apiClient from "../../services/apiClient";
// serviceCategoryMappingApi.ts

const basePath = "/ServiceCategoryMapping";
const basePathService = "/Service";
const basePathCategory = "/Category"; 


export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await apiClient.get<Service[]>(`${basePathService}`);
    return response.data; // response.data is guaranteed to be string[]
  } catch (error) {
    console.error("Failed to fetch Services:", error);
    throw error;
  }
} 

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Category[]>(basePathCategory);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

export async function fetchServiceCategoryMappings(): Promise<ServiceCategoryMapping[]> {
  try {
    const response = await apiClient.get<ServiceCategoryMapping[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch serviceCategoryMappings:", error);
    throw error;
  }
}

export async function fetchServiceCategoryMappingById(
  id: string | number
): Promise<ServiceCategoryMapping> {
  try {
    const response = await apiClient.get<ServiceCategoryMapping>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch serviceCategoryMapping with id ${id}:`, error);
    throw error;
  }
}

export async function createServiceCategoryMapping(payload: ServiceCategoryMapping): Promise<ServiceCategoryMapping> {
  try {
    const response = await apiClient.post<ServiceCategoryMapping>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create serviceCategoryMapping:", error);
    throw error;
  }
}

export async function updateServiceCategoryMapping(
  id: string | number,
  payload: ServiceCategoryMapping
): Promise<ServiceCategoryMapping> {
  try {
    const response = await apiClient.put<ServiceCategoryMapping>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update serviceCategoryMapping with id ${id}:`, error);
    throw error;
  }
}

export async function deleteServiceCategoryMapping(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete serviceCategoryMapping with id ${id}:`, error);
    throw error;
  }
}
