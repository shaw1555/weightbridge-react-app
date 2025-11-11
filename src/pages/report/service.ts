import { toast } from "react-toastify";
import { downloadBlob } from "../../utils/fileDownloader";
import type { VGMDeclarationForm, Setup } from "./types";
import apiClient from "../../services/apiClient"; 

const basePath = "/Report";

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
export async function DownloadODOOExport(
  fromDate: string,
  toDate: string,
  location: string
): Promise<void> {
  try {
    const response = await apiClient.get(`${basePath}/Download/ODOOExport`, {
      params: {
        fromDate,
        toDate,
        location,
      },
      responseType: "blob", // ✅ move here
    });

      // Construct filename exactly like API
    const safeLocation = location.replace(/\s+/g, "_"); // optional sanitize
    const filename = `ODOO_Export_${fromDate}_${toDate}_${safeLocation}.xlsx`;

    downloadBlob(response.data, filename);

    toast.success("Successfully Download.");
  } catch (error) {
    console.error("Failed to download ODOOExport:", error);
    toast.error("Failed Download.");
  }
}

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
