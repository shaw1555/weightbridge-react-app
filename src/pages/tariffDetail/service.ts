import type {  TariffDetail, Tariff, Service, Category, TruckType } from "./types";
import apiClient from "../../services/apiClient";
// tariffDetailApi.ts

const basePathTariffDetail = "/TariffDetail";

const basePathTariff = "/Tariff";
const basePathService = "/Service";
const basePathCategory = "/Category"; 
const basePathTruckType = "/TruckType";

export async function fetchTariffs(): Promise<Tariff[]> {
  try {
    const response = await apiClient.get<Tariff[]>(basePathTariff);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tariffs:", error);
    throw error;
  }
}

export async function fetchTruckTypes(): Promise<TruckType[]> {
  try {
    const response = await apiClient.get<TruckType[]>(basePathTruckType);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch truckTypes:", error);
    throw error;
  }
}

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

export async function fetchTariffDetails(): Promise<TariffDetail[]> {
  try {
    const response = await apiClient.get<TariffDetail[]>(basePathTariffDetail);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tariffDetails:", error);
    throw error;
  }
}

export async function fetchTariffDetailById(
  id: string | number
): Promise<TariffDetail> {
  try {
    const response = await apiClient.get<TariffDetail>(`${basePathTariffDetail}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch tariffDetail with id ${id}:`, error);
    throw error;
  }
}

export async function createTariffDetail(payload: TariffDetail): Promise<TariffDetail> {
  try {
    const response = await apiClient.post<TariffDetail>(basePathTariffDetail, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create tariffDetail:", error);
    throw error;
  }
}

export async function updateTariffDetail(
  id: string | number,
  payload: TariffDetail
): Promise<TariffDetail> {
  try {
    const response = await apiClient.put<TariffDetail>(
      `${basePathTariffDetail}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update tariffDetail with id ${id}:`, error);
    throw error;
  }
}

export async function deleteTariffDetail(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePathTariffDetail}/${id}`);
  } catch (error) {
    console.error(`Failed to delete tariffDetail with id ${id}:`, error);
    throw error;
  }
}
