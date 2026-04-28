import type { ChangePasswordRequest, ChangePasswordResponse, ResetPasswordConfirmRequest, ResetPasswordConfirmResponse, ResetPasswordRequest, ResetPasswordResponse } from "@/modules";
import { api } from "../instance";

export const sendResetPasswordEmail = async (
  payload: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>(
    "/users/reset-password",
    payload
  );
  return response.data;
};

export const changePasswordRequest = async (
  payload: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await api.put<ChangePasswordResponse>(
    "/auth/change-password",
    payload
  );
  return response.data;
};

export const resetPasswordConfirm = async (
  payload: ResetPasswordConfirmRequest
): Promise<ResetPasswordConfirmResponse> => {
  const response = await api.post<ResetPasswordConfirmResponse>(
    "/users/reset-password/confirm",
    payload
  );
  return response.data;
};