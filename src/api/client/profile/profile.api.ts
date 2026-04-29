import type { IProfile } from "@/modules";
import { api } from "../instance";
import type { AxiosRequestConfig } from "axios";

export const getProfileById = async (id: number, config?: AxiosRequestConfig): Promise<IProfile> => {
  const response = await api.get<IProfile>(`/users/${id}`, config);
  return response.data;
};

export const updateProfile = async (id: number, profileData: Partial<IProfile>, config?: AxiosRequestConfig): Promise<IProfile> => {
  const response = await api.put<IProfile>(`/users/${id}`, profileData, config);
  return response.data;
};