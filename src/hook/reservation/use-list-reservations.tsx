import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "../../hook/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface Reservation {
  id: number;
  fechaReserva: string;
  horaReserva: string;
  cantidadHoras: number;
  valorTotal: string;
  estado: string;
  cancha: {
    id: number;
    nombreCancha: string;
    direccion: string;
    valorHora: number;
    horarioInicio: string;
    horarioFin: string;
    mall: {
      nombreCentro: string;
      ciudad: string;
    };
  };
}

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${API_URL}/reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(response.data);
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Error al cargar reservas",
          description: error.response?.data?.message || "Intenta de nuevo más tarde",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, loading };
};
