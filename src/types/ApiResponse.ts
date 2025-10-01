// ApiResponse.ts
export interface ApiResponse<T = any> {
  success: boolean;      // Indicates if the API call succeeded
  message?: string;      // Optional message from server
  data?: T;              // Generic type for the payload
  errors?: Record<string, any>; // Optional detailed errors, e.g., validation
  statusCode?: number;   // Optional HTTP status code
}
