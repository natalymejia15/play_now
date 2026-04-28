import type { ICreateReservationsPayload, IReservations } from "@/modules";
import { api } from "../instance";

export const getReservations = async (): Promise<IReservations[]> => {
    const response = await api.get<{reservas : IReservations[]}>('/reservations');
    return response.data.reservas ?? [];
};

export const getReservationById = async (id: number): Promise<IReservations> => {
  const response = await api.get<IReservations>(`/reservations/${id}`);
  return response.data;
};

export const createReservations = async (payload: ICreateReservationsPayload): Promise<void> => {
  await api.post<IReservations>('/reservations', payload);
};
