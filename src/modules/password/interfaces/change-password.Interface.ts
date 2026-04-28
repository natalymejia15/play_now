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

export interface RecoverPasswordParams {
  newPassword: string;
  confirmPassword: string;

}

export interface PasswordParams {
  newPassword: string;
  currentPassword: string;
}