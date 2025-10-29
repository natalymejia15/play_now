import { useState, useEffect } from "react";
import type { IMall } from "../types/mall";
import type { IAdmin } from "../types/admin";
import axios from "axios";
import { toast } from "./use-toast";

interface ICreateMallPayload {
  mall: IMall;
  admin: IAdmin;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useCreateMall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [malls, setMalls] = useState<IMall[]>([]);
  const [fetching, setFetching] = useState(false); 

  const createMall = async (payload: ICreateMallPayload) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Error",
        description: "No se encontró token de autenticación",
        variant: "destructive",
      });
      return { data: null, error: "No token" };
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/malls`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Éxito",
        description: "Centro comercial y administrador creados correctamente",
        variant:"success"
      });

      return { data: response.data, error: null as string | null };
    } catch (err: any) {
      console.error("Error creating mall:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "No se pudo crear el centro comercial",
        variant: "destructive",
      });
      return { data: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMalls = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Error",
        description: "No se encontró token de autenticación",
        variant: "destructive",
      });
      return;
    }

    setFetching(true);
    try {
      const response = await axios.get(`${API_URL}/malls`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMalls(response.data || []);
    } catch (err: any) {
      console.error("Error fetching malls:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "No se pudieron cargar los centros comerciales",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMalls();
  }, []);

  return { createMall, isLoading, malls, fetchMalls, fetching };
};
