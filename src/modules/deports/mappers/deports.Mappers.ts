import type { DeportsData, IDeport } from "../interfaces";

export const mapDeportResponseToDeportData = (data: IDeport): DeportsData => ({
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    cantidad: data.cantidad,
    activo: data.activo,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});