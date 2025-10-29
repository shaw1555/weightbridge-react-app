import type {
  Customer,
  ActiveTariff,
  WeighGateInOut,
  Setup,
  TruckType,
  Category,
  Service,
} from "./types";
import apiClient from "../../services/apiClient";
// weighGateInOutApi.ts

const basePath = "/WeighGateInOut";

const basePathSetup = "/Setup";

const basePathCustomer = "/Customer";

const basePathTruckType = "/TruckType";

const basePathCategory = "/Category";

const basePathService = "/Service";

const basePathTariff = "/Tariff";

export async function fetchActiveTariff(): Promise<ActiveTariff> {
  try {
    const response = await apiClient.get<ActiveTariff>(
      `${basePathTariff}/ActiveTariff`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch active tariff`, error);
    throw error;
  }
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await apiClient.get<Service[]>(basePathService);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
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

export async function fetchTruckTypes(): Promise<TruckType[]> {
  try {
    const response = await apiClient.get<TruckType[]>(basePathTruckType);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch truckTypes:", error);
    throw error;
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const response = await apiClient.get<Customer[]>(basePathCustomer);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
}

export async function fetchSetups(): Promise<Setup[]> {
  try {
    const response = await apiClient.get<Setup[]>(basePathSetup);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch setups:", error);
    throw error;
  }
}

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
  const response = await apiClient.post<WeighGateInOut>(basePath, payload);
  return response.data;
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
