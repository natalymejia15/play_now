import type { ICourts, ICreateCourtsRequest, UpdateCourtsPayload } from "@/modules";
import { api } from "../instance";

export const getCourts = async (): Promise<ICourts[]> => {
    const response = await api.get<ICourts[]>('/courts');
    return response.data;
};

export const buildImage = (img?: string | null) =>
    img ? `/uploads/${img}` : null;

export const getCourtsById = async (id: number): Promise<ICourts> => {
    const { data } = await api.get<ICourts>(`/courts/${id}`);
    return {
        ...data,
        imagen: buildImage(data.imagen)
    }
};

export const createCourts = async (payload: ICreateCourtsRequest): Promise<void> => {
    await api.post<ICourts>('/courts', payload);
};

export const updateCourts = async (id: number, payload: UpdateCourtsPayload): Promise<void> => {
    await api.put(`/courts/${id}`, payload);
};

export const deleteCourts = async (id: number): Promise<void> => {
    await api.delete(`/courts/${id}`);
};