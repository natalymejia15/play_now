import { useState } from "react";
import axios from "axios";
import { toast } from "../../hook/use-toast";
import type { IMall } from "../../types/mall";
import type { IAdmin } from "../../types/admin";

interface ICreateMallPayload {
  mall: IMall;
  admin: IAdmin;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useCreateMall = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createMall = async (payload: ICreateMallPayload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "No se encontró token de autenticación",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/malls`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Éxito",
        description: "Centro comercial creado correctamente",
        variant: "success",
      });

      return data;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Error al crear el centro comercial",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createMall, isLoading };
};
