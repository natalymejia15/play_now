import type { EditDeportsFormData, IDeport, UpdateDeportsPayload } from "../interfaces";

export const INITIAL_EDIT_DEPORTS_FORM: EditDeportsFormData = {
    nombre: "",
    description: "",
    cantidad: 0,
    activo: false,
};

export const mapDeportsToEditForm = (deports: IDeport): EditDeportsFormData => ({
    nombre: deports.nombre ?? "",
    description: deports.description ?? "",
    cantidad: deports.cantidad ?? "",
    activo: deports.activo ?? "",
});

export const mapEditDeportsFormToPayload = (form: EditDeportsFormData): UpdateDeportsPayload => ({
    nombre: form.nombre,
    description: form.description,
    cantidad: form.cantidad,
    activo: form.activo,
});