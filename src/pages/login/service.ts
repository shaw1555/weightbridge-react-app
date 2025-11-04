import type { 
  Setup, 
} from "./types";
import apiClient from "../../services/apiClient";
// weighGateInOutApi.ts
 
const basePathSetup = "/Setup";
   

export async function fetchSetups(): Promise<Setup[]> {
  try {
    const response = await apiClient.get<Setup[]>(basePathSetup);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch setups:", error);
    throw error;
  }
}
 