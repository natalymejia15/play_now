import { getReservations } from "@/api";
import { extractApiErrorMessage, toast } from "@/lib";
import { useEffect, useState } from "react";
import type { ApiErrorResponseReservations, IReservations } from "../interfaces";
import type { AxiosError } from "axios";

export const useClientHistorialReservations = () => {
  const [reservations, setReservations] = useState<IReservations[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchAllReservations = async () => {
      setFetching(true);
      try {
        const data = await getReservations();
        setReservations(Array.isArray(data) ? data : []);
      } catch (error) {
        const description = extractApiErrorMessage(
          error as AxiosError<ApiErrorResponseReservations>,
          "No se pudieron cargar el historial de reservas"
        );
        toast({ title: "Error", description, variant: "destructive" });
      } finally {
        setFetching(false);
      }
    };

    fetchAllReservations();
  }, []);

  return { reservations, fetching };
};