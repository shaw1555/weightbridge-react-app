import { type Customer } from "./types";
import apiClient from "../../services/apiClient";
// customerApi.ts

const basePath = "/Customer";

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const response = await apiClient.get<Customer[]>(basePath);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
}

export async function fetchCustomerById(
  id: string | number
): Promise<Customer> {
  try {
    const response = await apiClient.get<Customer>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch customer with id ${id}:`, error);
    throw error;
  }
}

export async function createCustomer(payload: Customer): Promise<Customer> {
  try {
    const response = await apiClient.post<Customer>(basePath, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create customer:", error);
    throw error;
  }
}

export async function updateCustomer(
  id: string | number,
  payload: Customer
): Promise<Customer> {
  try {
    const response = await apiClient.put<Customer>(
      `${basePath}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update customer with id ${id}:`, error);
    throw error;
  }
}

export async function deleteCustomer(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to delete customer with id ${id}:`, error);
    throw error;
  }
}
