import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import {
  extractApiErrorMessage,
  toast,
  useFormData,
} from "@/lib";
import {
  INITIAL_DATA_RESERVATIONS,
  type ApiErrorResponseReservations,
  type ReservationsFormData,
  type UseCreateReservationProps,
} from "../interfaces";
import { mapCreateReservationsFormToPayload } from "../mappers";
import { createReservations } from "@/api";

const PAGE_TITLE = "Gestión de Deportes - Play now";
const RELOAD_DELAY_MS = 800;

export const useCreateReservation = ({
  onOpenChange,
  selectedCourt,
}: UseCreateReservationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number>(1);

  const { formData: reservationsData, updateFormData } =
    useFormData<ReservationsFormData>(INITIAL_DATA_RESERVATIONS);

  const pricePerHour =
    selectedCourt.valorHora ?? selectedCourt.price ?? 0;

  const total = duration * pricePerHour;

  useEffect(() => {
    updateFormData({ cantidadHoras: duration });
  }, [duration, updateFormData]);

  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  const handleChange = (
    field: keyof ReservationsFormData,
    value: string
  ) => {
    updateFormData({ [field]: value } as Partial<ReservationsFormData>);
  };

  const handleDurationChange = (value: number) => {
    if (!Number.isNaN(value) && value >= 1 && value <= 4) {
      setDuration(value);
      updateFormData({ cantidadHoras: value });
    }
  };

  const handleSuccess = () => {
    onOpenChange(false);

    setTimeout(() => {
      window.location.reload();
    }, RELOAD_DELAY_MS);

    toast({
      title: "Reserva creada",
      description: "Tu reserva fue registrada con éxito.",
    });
  };

  const handleError = (
    error: AxiosError<ApiErrorResponseReservations>
  ) => {
    const description = extractApiErrorMessage(
      error,
      "No se pudo registrar la reserva."
    );

    toast({
      title: "Error",
      description,
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = mapCreateReservationsFormToPayload({
        ...reservationsData,
        courtId: selectedCourt.id,
      });

      await createReservations(payload);
      handleSuccess();
    } catch (error) {
      handleError(error as AxiosError<ApiErrorResponseReservations>);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
    handleChange,
    duration,
    handleDurationChange,
    total,
    pricePerHour,
  };
};