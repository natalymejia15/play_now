import type { DeportsData, IDeport } from "../interfaces";

export const mapDeportResponseToDeportData = (data: IDeport): DeportsData => ({
    id: data.id,
    nombre: data.nombre,
    description: data.description,
    cantidad: data.cantidad,
    activo: data.activo,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});