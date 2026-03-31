import type { CourtsFormData, ICreateCourtsRequest } from "../interfaces";

export const mapCreateCourtsFormToPayload = (formData: CourtsFormData): ICreateCourtsRequest => {
    return {
        nombreCancha: formData.nombreCancha,
        direccion: formData.direccion,
        valorHora: formData.valorHora,
        telefono: formData.telefono,
        responsable: formData.responsable,
        horarioInicio: formData.horarioInicio,
        horarioFin: formData.horarioFin,
        diasDisponibles: formData.diasDisponibles.join(','),
        detalles: formData.detalles,
        capacidad: formData.capacidad,
        imagen: typeof formData.imagen === 'string'
            ? formData.imagen
            : null,
        mallId: formData.mallId
            ? Number(formData.mallId)
            : null,
    };
};