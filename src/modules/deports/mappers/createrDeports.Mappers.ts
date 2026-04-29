import type { DeportsFormData, ICreateDeportsRequest } from "../interfaces";

export const mapCreateDeportsFormToPayload = (formData: DeportsFormData): ICreateDeportsRequest => {
    return {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        cantidad: Number(formData.cantidad),
        activo: formData.activo,
    };
};