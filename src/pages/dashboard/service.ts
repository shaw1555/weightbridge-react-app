import type {
  TodayGroupByCustomerCount,
  TodayGroupByCustomerAmount,
  SevenDayAgoGroupByDateCount,
  SevenDayAgoGroupByDateAmount,
  Setup,
} from "./types";
import apiClient from "../../services/apiClient";

const basePath = "/Dashboard";

const basePathSetup = "/Setup";

export async function fetchTodayGroupByCustomerCounts(
  location_f: string | number | null
): Promise<TodayGroupByCustomerCount[]> {
  try {
    const response = await apiClient.get<TodayGroupByCustomerCount[]>(
      `${basePath}/TodayGroupByCustomerCount/${location_f}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch TodayGroupByCustomerCount:", error);
    throw error;
  }
}

export async function fetchTodayGroupByCustomerAmounts(
  location_f: string | number | null
): Promise<TodayGroupByCustomerAmount[]> {
  try {
    const response = await apiClient.get<TodayGroupByCustomerAmount[]>(
      `${basePath}/TodayGroupByCustomerAmount/${location_f}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch TodayGroupByCustomerAmount:", error);
    throw error;
  }
}

export async function fetchSevenDayAgoGroupByDateCounts(
  location_f: string | number | null
): Promise<SevenDayAgoGroupByDateCount[]> {
  try {
    const response = await apiClient.get<SevenDayAgoGroupByDateCount[]>(
      `${basePath}/SevenDayAgoGroupByDateCount/${location_f}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch SevenDayAgoGroupByDateCount:", error);
    throw error;
  }
}

export async function fetchSevenDayAgoGroupByDateAmounts(
  location_f: string | number | null
): Promise<SevenDayAgoGroupByDateAmount[]> {
  try {
    const response = await apiClient.get<SevenDayAgoGroupByDateAmount[]>(
      `${basePath}/SevenDayAgoGroupByDateAmount/${location_f}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch SevenDayAgoGroupByDateAmount:", error);
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

