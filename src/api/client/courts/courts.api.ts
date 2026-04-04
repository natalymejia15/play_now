import type { ICourts, ICreateCourtsRequest, UpdateCourtsPayload } from "@/modules";
import { api } from "../instance";

export const getCourts = async (): Promise<ICourts[]> => {
    const response = await api.get<ICourts[]>('/courts');
    return response.data;
};

export const buildImage = (img?: string | null) =>
    img ? img : null;

export const getCourtsById = async (id: number): Promise<ICourts> => {
    const { data } = await api.get<ICourts>(`/courts/${id}`);
    return {
        ...data,
        imagen: buildImage(data.imagen)
    }
};

export const createCourts = async (payload: ICreateCourtsRequest | FormData): Promise<void> => {
    if (payload instanceof FormData) {
        await api.post<ICourts>('/courts', payload);
        return;
    }

    await api.post<ICourts>('/courts', payload);
};

export const updateCourts = async (id: number, payload: UpdateCourtsPayload | FormData): Promise<void> => {
    if (payload instanceof FormData) {
        await api.put(`/courts/${id}`, payload);
        return;
    }

    await api.put(`/courts/${id}`, payload);
};

export const deleteCourts = async (id: number): Promise<void> => {
    await api.delete(`/courts/${id}`);
};

export const getCourtsByIdMalls = async (mallId: number): Promise<ICourts> => {
    const response = await api.get<ICourts>(`/courts/mall/${mallId}`);
    return response.data
}