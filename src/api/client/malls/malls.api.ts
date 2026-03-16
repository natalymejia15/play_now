import type { ICreateMallPayload, IMall, UpdateMallPayload } from "@/modules";
import { api } from "../instance";

export const getMalls = async (): Promise<IMall[]> => {
  const response = await api.get<IMall[]>('/malls'); // 👈 IMall[] 
  return response.data;
};

export const getMallById = async (id: number): Promise<IMall> => {
  const response = await api.get<IMall>(`/malls/${id}`);
  return response.data;
};

export const createMall = async (payload: ICreateMallPayload): Promise<void> => {
  await api.post<IMall>('/malls', payload);
};

export const updateMall = async (id: number, payload: UpdateMallPayload): Promise<void> => {
  await api.put(`/malls/${id}`, payload);
};

export const deleteMall = async (id: number): Promise<void> => {
  await api.delete(`/malls/${id}`);
};