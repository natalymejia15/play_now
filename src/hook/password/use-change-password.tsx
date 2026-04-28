import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { ChangePasswordParams } from "../../types/change";
import { useToast } from "@/lib";

const API_URL =  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useChangePassword = (token?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const changePassword = async ({ newPassword, confirmPassword }: ChangePasswordParams) => {
    setError(null);

    if (!token) {
      setError("Token inválido o expirado.");
      toast({ title: "Error", description: "Token inválido o expirado", variant: "destructive" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden", variant: "destructive" });
      return;
    }

    if (newPassword.length < 8) {
      toast({ title: "Error", description: "La contraseña debe tener al menos 8 caracteres", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/users/reset-password/confirm`,
        { token, newPassword }
      );

      if (response.status === 200) {
        toast({ title: "Contraseña actualizada", description: "Tu contraseña ha sido cambiada exitosamente", variant: "success" });
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err: any) {
      console.error("Error al cambiar contraseña:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Error al cambiar la contraseña");
      toast({ title: "Error", description: err.response?.data?.message || "Error al cambiar la contraseña", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error };
};
