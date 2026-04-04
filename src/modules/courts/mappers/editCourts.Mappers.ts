import type { EditCourtsFormData, ICourts, UpdateCourtsPayload } from "../interfaces";

export const INITIAL_EDIT_COURT_FORM: EditCourtsFormData = {
    nombreCancha: "",
    direccion: "",
    valorHora: 0,
    telefono: "",
    responsable: "",
    horarioInicio: "",
    horarioFin: "",
    diasDisponibles: [],
    detalles: "",
    sportId: null,
    imagen: "",
    mallId: null
}

export const mapCourtsToEditForm = (courts: ICourts): EditCourtsFormData => ({
    nombreCancha: courts.nombreCancha ?? "",
    direccion: courts.direccion ?? "",
    valorHora: courts.valorHora ?? 0,
    telefono: courts.telefono ?? "",
    responsable: courts.responsable ?? "",
    horarioInicio: courts.horarioInicio ?? "",
    horarioFin: courts.horarioFin ?? "",
    diasDisponibles: courts.diasDisponibles
        ? courts.diasDisponibles.split(',')
        : [],
    detalles: courts.detalles ?? "",
    sportId: courts.sportId ?? null,
    imagen: courts.imagen ?? "",
    mallId: courts.mallId ?? null
})

export const mapEditCourtsFormToPayload = (form: EditCourtsFormData): UpdateCourtsPayload | FormData => {
    const base = {
        nombreCancha: form.nombreCancha,
        direccion: form.direccion,
        valorHora: form.valorHora,
        telefono: form.telefono,
        responsable: form.responsable,
        horarioInicio: form.horarioInicio,
        horarioFin: form.horarioFin,
        diasDisponibles: form.diasDisponibles.join(","),
        detalles: form.detalles,
        sportId: form.sportId ? (typeof form.sportId === "number" ? form.sportId : Number(form.sportId)) : null,
        mallId: form.mallId ? (typeof form.mallId === "number" ? form.mallId : Number(form.mallId)) : null
    } as UpdateCourtsPayload;

    if (form.imagen && typeof form.imagen !== "string") {
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
        fd.append('imagen', form.imagen);
        return fd;
    }

    return {
        ...base,
        imagen: typeof form.imagen === "string" ? form.imagen : null,
    } as UpdateCourtsPayload;
}