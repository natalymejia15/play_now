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
    capacidad: 0,
    imagen: "",
    mallId: 0
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
    capacidad: courts.capacidad ?? 0,
    imagen: courts.imagen ?? "",
    mallId: courts.mallId ?? null
})

export const mapEditCourtsFormToPayload = (form: EditCourtsFormData): UpdateCourtsPayload => ({
    nombreCancha: form.nombreCancha,
    direccion: form.direccion,
    valorHora: form.valorHora,
    telefono: form.telefono,
    responsable: form.responsable,
    horarioInicio: form.horarioInicio,
    horarioFin: form.horarioFin,
    diasDisponibles: form.diasDisponibles.join(","),
    detalles: form.detalles,
    capacidad: form.capacidad,
    imagen: typeof form.imagen === "string" ? form.imagen : null,
    mallId: form.mallId ? (typeof form.mallId === "number" ? form.mallId : Number(form.mallId)) : null
}) 