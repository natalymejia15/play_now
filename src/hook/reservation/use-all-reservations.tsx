import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/lib";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface AllReservation {
  id: number;
  fechaReserva: string;
  horaReserva: string;
  cantidadHoras: number;
  valorTotal: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
  cancha: {
    id: number;
    nombreCancha: string;
    direccion: string;
    valorHora: number;
    horarioInicio: string;
    horarioFin: string;
  };
  cliente: {
    id: number;
    primerNombre: string;
    primerApellido: string;
    correo: string;
    celular: string;
    numeroDocumento: string;
  };
}

export const useAllReservations = () => {
  const [reservations, setReservations] = useState<AllReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllReservations = async () => {
      const token = sessionStorage.getItem("token");

      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (error: any) {
        console.error("Error al obtener reservas:", error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "No se pudieron cargar las reservas.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllReservations();
  }, []);

  return { reservations, loading };
};
