import type { DeportsFormData, ICreateDeportsPayload } from "../interfaces";

export const mapCreateDeportsFormToPayload = (formData: DeportsFormData): ICreateDeportsPayload => {
    return {
        id: 0,
        nombre: formData.nombre,
        description: formData.description,
        cantidad: formData.cantidad,
        activo: formData.activo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    };
}