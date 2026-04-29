import type { EditDeportsFormData, IDeport, UpdateDeportsPayload } from "../interfaces";

export const INITIAL_EDIT_DEPORTS_FORM: EditDeportsFormData = {
    nombre: "",
    descripcion: "",
    cantidad: 0,
    activo: false,
};

export const mapDeportsToEditForm = (deports: IDeport): EditDeportsFormData => ({
    nombre: deports.nombre ?? "",
    descripcion: deports.descripcion ?? "",
    cantidad: deports.cantidad ?? "",
    activo: deports.activo ?? "",
});

export const mapEditDeportsFormToPayload = (form: EditDeportsFormData): UpdateDeportsPayload => ({
    nombre: form.nombre,
    descripcion: form.descripcion,
    cantidad: form.cantidad,
});