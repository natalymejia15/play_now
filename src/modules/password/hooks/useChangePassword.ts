import { useState } from "react";
import type { AxiosError } from "axios";
import { toast, extractApiErrorMessage } from "@/lib";
import { changePasswordRequest } from "@/api";
import type { ApiErrorResponseChangePassword, PasswordParams } from "../interfaces";

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async ({ currentPassword, newPassword }: PasswordParams) => {
    setIsLoading(true);

    try {
      await changePasswordRequest({ currentPassword, newPassword });

      toast({
        title: "Contraseña actualizada correctamente",
        description: "Tu nueva contraseña ha sido guardada con éxito.",
        variant: "success",
      });
    } catch (error) {
      const description = extractApiErrorMessage(
        error as AxiosError<ApiErrorResponseChangePassword>,
        "No se pudo actualizar la contraseña"
      );

      toast({
        title: "Error al cambiar contraseña",
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