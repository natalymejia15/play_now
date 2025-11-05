import { useState } from "react";
import axios from "axios";
import { useToast } from "../use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

export const usePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const changePassword = async ({ currentPassword, newPassword }: PasswordParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No se encontró token de autenticación.");

      const response = await axios.put(
        `${API_URL}/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Contraseña actualizada correctamente",
        description: "Tu nueva contraseña ha sido guardada con éxito.",
        variant:"success"
      });

      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "No se pudo actualizar la contraseña. Intenta nuevamente.";

      setError(message);

      toast({
        title: "Error al cambiar contraseña",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error };
};
