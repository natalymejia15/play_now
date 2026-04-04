import type { CourtsFormData, ICreateCourtsRequest } from "../interfaces";

export const mapCreateCourtsFormToPayload = (formData: CourtsFormData): ICreateCourtsRequest | FormData => {
    const base = {
        nombreCancha: formData.nombreCancha,
        direccion: formData.direccion,
        valorHora: formData.valorHora,
        telefono: formData.telefono,
        responsable: formData.responsable,
        horarioInicio: formData.horarioInicio,
        horarioFin: formData.horarioFin,
        diasDisponibles: formData.diasDisponibles.join(','),
        detalles: formData.detalles,
        sportId: formData.sportId ? Number(formData.sportId) : null,
        mallId: formData.mallId ? Number(formData.mallId) : null,
    } as ICreateCourtsRequest;
    if (formData.imagen && typeof formData.imagen !== 'string') {
        const fd = new FormData();
        fd.append('nombreCancha', String(base.nombreCancha));
        fd.append('direccion', String(base.direccion));
        fd.append('valorHora', String(base.valorHora));
        fd.append('telefono', String(base.telefono));
        fd.append('responsable', String(base.responsable));
        fd.append('horarioInicio', String(base.horarioInicio));
        fd.append('horarioFin', String(base.horarioFin));
        fd.append('diasDisponibles', String(base.diasDisponibles));
        if (base.detalles) fd.append('detalles', String(base.detalles));
        if (base.sportId !== null) fd.append('sportId', String(base.sportId));
        if (base.mallId !== null) fd.append('mallId', String(base.mallId));
        fd.append('imagen', formData.imagen);
        return fd;
    }
    return {
        ...base,
        imagen: typeof formData.imagen === 'string' ? formData.imagen : null,
    } as ICreateCourtsRequest;
};