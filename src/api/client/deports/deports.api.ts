import type { ICreateDeportsRequest, IDeport, UpdateDeportsPayload } from "@/modules";
import { api } from "../instance";

export const getDeports = async (): Promise<IDeport[]> => {
  const response = await api.get<IDeport[]>('/sports');
  return response.data;
};

export const deleteDeport = async (id: number): Promise<void> => {
    console.log("API deleteDeport llamado con id:", id); 
  await api.delete(`/sports/${id}`);
};

export const getDeportsById = async (id: number): Promise<IDeport> => {
  const response = await api.get<IDeport>(`/sports/${id}`);
  return response.data; 
};

export const createDeports = async (payload: ICreateDeportsRequest): Promise<void> => {
  await api.post<IDeport>('/sports', payload);
};

export const updateDeports = async (id: number, payload: UpdateDeportsPayload): Promise<void> => {
  await api.put(`/sports/${id}`, payload);
};
