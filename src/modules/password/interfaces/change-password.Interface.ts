export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ApiErrorResponseChangePassword {
  message?: string;
  error?: string;
}

export interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}