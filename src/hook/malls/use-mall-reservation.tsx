import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "../use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useMalls = () => {
  const [malls, setMalls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMalls = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_URL}/malls`);
      setMalls(data);
    } catch (error) {
      console.error("Error al cargar malls:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los centros comerciales.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMalls();
  }, []);

  return { malls, isLoading, fetchMalls };
};
