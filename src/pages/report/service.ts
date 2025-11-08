import { toast } from "react-toastify";
import { downloadBlob } from "../../utils/fileDownloader";
import type { VGMDeclarationForm } from "./types";
import apiClient from "../../services/apiClient";
// weighVGMApi.ts

const basePath = "/Report";

export async function DownloadVGMDeclarationForm(
  payload: VGMDeclarationForm
): Promise<void> {
  try {
    const response = await apiClient.post(
      `${basePath}/Download/VGMDeclarationForm`,
      payload,
      { responseType: "blob" }
    );

    // Use the centralized helper
    downloadBlob(
      response.data,
      `VGMDeclarationForm${payload.booking_no_f}.pdf`
    );
  } catch (error) {
    console.error("Failed to download WeightSlip:", error);
    throw error;
  }
}

export async function fetchVGMDeclarationForm(
  fromDate: string,
  toDate: string
): Promise<VGMDeclarationForm[]> {
  try {
    const response = await apiClient.get<VGMDeclarationForm[]>(
      `${basePath}/VGMDeclarationForm`,
      {
        params: {
          fromDate,
          toDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch VGMDeclarationForm:", error);
    throw error;
  }
}
