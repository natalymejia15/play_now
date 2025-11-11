import axios from "axios";
import { toast } from "../use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useCreateReservation = () => {
  const createReservation = async (payload: any) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${API_URL}/reservations`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Reserva creada",
        description: "Tu reserva fue registrada con éxito.",
      });
    } catch (error: any) {
      console.error("Error al crear reserva:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo registrar la reserva.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { createReservation };
};
