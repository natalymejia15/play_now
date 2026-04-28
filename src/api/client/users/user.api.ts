import type { RegisterFormData } from "@/lib";
import { api } from "../instance";

export interface RegisterResponse {
  message: string;
}

export const registerUser = async (
  payload: RegisterFormData
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/users/register",
    payload
  );
  return response.data;
};