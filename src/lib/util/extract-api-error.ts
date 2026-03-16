import type { ApiErrorResponse } from "@/modules";
import type { AxiosError } from "axios";

export const extractApiErrorMessage = (
  error: AxiosError<ApiErrorResponse>,
  fallback = "Error inesperado"
): string => {
  const data = error?.response?.data;

  if (!data) return error?.message ?? fallback;

  if (typeof data.message === "string") return data.message;
  if (Array.isArray(data.errors)) return data.errors.join(", ");
  if (typeof data === "string") return data;

  return JSON.stringify(data);
};