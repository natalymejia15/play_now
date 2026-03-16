import type { ICreateDeportsPayload, IDeport } from "@/modules";
import { api } from "../instance";

export const getDeports = async (): Promise<IDeport[]> => {
  const response = await api.get<IDeport[]>('/sports');
  return response.data;
};

export const deleteDeport = async (id: number): Promise<void> => {
  await api.delete(`/sports/${id}`);
};

export const getDeportsById = async (id: number): Promise<IDeport> => {
  const response = await api.get<IDeport>(`/sports/${id}`);
  return response.data;
};

export const createDeports = async (payload: ICreateDeportsPayload): Promise<void> => {
  await api.post<IDeport>('/sports', payload);
};
