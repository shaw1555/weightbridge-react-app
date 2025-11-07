import { toast } from "react-toastify";
import { downloadBlob } from "../../utils/fileDownloader";
import type {
  Customer, 
  VGMGateInOutInfo, 
  WeighVGM,
  Setup, 
} from "./types";
import apiClient from "../../services/apiClient";
// weighVGMApi.ts

const basePath = "/WeighVGM";

const basePathSetup = "/Setup";

const basePathCustomer = "/Customer";



export async function DownloadWeightSlip(transactionNo: string): Promise<void> {
  try {
    const response = await apiClient.get(
      `${basePath}/Download/WeightSlip/${transactionNo}`,
      { responseType: "blob" }
    );

    // Use the centralized helper
    downloadBlob(response.data, `WeightSlip_${transactionNo}.pdf`);
  } catch (error) {
    console.error("Failed to download WeightSlip:", error);
    throw error;
  }
}


export async function fetchVGMGateInOutInfo(): Promise<VGMGateInOutInfo[]> {
  try {
    const response = await apiClient.get<VGMGateInOutInfo[]>(
      `${basePath}/VGMGateInOutInfo`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch VGMGateInOutInfo:", error);
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

export async function fetchWeighVGMs(
  fromDate: string,
  toDate: string
): Promise<WeighVGM[]> {
  try {
    const response = await apiClient.get<WeighVGM[]>(basePath, {
      params: {
        fromDate,
        toDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch weighVGMs:", error);
    throw error;
  }
}

export async function fetchWeighVGMById(
  id: string | number
): Promise<WeighVGM> {
  try {
    const response = await apiClient.get<WeighVGM>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch weighVGM with id ${id}:`, error);
    throw error;
  }
}

export async function createWeighVGM(
  payload: WeighVGM
): Promise<WeighVGM> {
  const response = await apiClient.post<WeighVGM>(basePath, payload);
  return response.data;
}

export async function updateWeighVGM(
  id: string | number,
  payload: WeighVGM
): Promise<WeighVGM> {
  try {
    const response = await apiClient.put<WeighVGM>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update weighVGM with id ${id}:`, error);
    throw error;
  }
}

export async function updateWeighDetailVGM(
  id: string | number,
  payload: WeighVGM
): Promise<WeighVGM> {
  try {
    const response = await apiClient.put<WeighVGM>(
      `${basePath}/UpdateWeightDetail${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to update WeighDetailVGM with id ${id}:`,
      error
    );
    throw error;
  }
}

export async function deleteWeighVGM(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete weighVGM with id ${id}:`, error);
    throw error;
  }
}
