import type { CourtsData, ICourts } from "../interfaces";

export const mapCourtsResponseToCourtsData = (data: ICourts): CourtsData => ({
    id: data.id,
    nombreCancha: data.nombreCancha,
    direccion: data.direccion,
     valorHora: data.valorHora,
    telefono: data.telefono,
    responsable: data.responsable,
    horarioInicio: data.horarioInicio,
    horarioFin: data.horarioFin,
    diasDisponibles: data.diasDisponibles,
    detalles: data.detalles,
    sportId: data.sportId ?? null,
    cantidadCancha: data.deporte?.cantidad ?? null,
    deporteNombre: data.deporte?.nombre ?? (data.sportId !== undefined && data.sportId !== null ? String(data.sportId) : null),
    imagen: data.imagen,
    mallId: data.mallId,
})
