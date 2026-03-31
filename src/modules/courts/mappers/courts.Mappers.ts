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
    capacidad: data.capacidad,
    imagen: data.imagen,
    mallId: data.mallId,
})