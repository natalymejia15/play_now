import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { toast, extractApiErrorMessage } from "@/lib";
import type { ApiErrorResponseResetPassword, RecoverPasswordParams } from "../interfaces";
import { resetPasswordConfirm } from "@/api";

export const useRecoverPassword = (token?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changePassword = async ({
    newPassword,
    confirmPassword,
  }: RecoverPasswordParams) => {
    if (!token) {
      toast({
        title: "Error",
        description: "Token inválido o expirado",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 8 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordConfirm({ token, newPassword });

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido cambiada exitosamente",
        variant: "success",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const description = extractApiErrorMessage(
        error as AxiosError<ApiErrorResponseResetPassword>,
        "Error al cambiar la contraseña"
      );

      toast({
        title: "Error",
        description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changePassword,
    isLoading,
  };
};