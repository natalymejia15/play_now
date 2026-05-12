import type { IContact, ICreateContactRequest } from "@/interfaces";
import { api } from "../instance";

export const createContact = async (payload: ICreateContactRequest): Promise<void> => {
  await api.post<IContact>('/contact', payload);
};