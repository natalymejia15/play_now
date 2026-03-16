import type { DeportsFormData, ICreateDeportsRequest } from "../interfaces";

export const mapCreateDeportsFormToPayload = (formData: DeportsFormData): ICreateDeportsRequest => {
    return {
        nombre: formData.nombre,
        description: formData.description,
        cantidad: formData.cantidad,
        activo: formData.activo,
    };
};