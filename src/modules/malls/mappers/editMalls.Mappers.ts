import type { EditMallFormData, IMall, UpdateMallPayload } from "../interfaces";


export const INITIAL_EDIT_MALL_FORM: EditMallFormData = {
    nombreCentro: "",
    direccionMall: "",
    telefono: "",
    ciudad: "",
    tipoDocumento: "CC",
    numeroDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    celular: "",
    direccionAdmin: "",
};

export const mapMallToEditForm = (mall: IMall): EditMallFormData => ({
    nombreCentro: mall.nombreCentro ?? "",
    direccionMall: mall.direccion ?? "",
    telefono: mall.telefono ?? "",
    ciudad: mall.ciudad ?? "",
    tipoDocumento: mall.administrador?.tipoDocumento ?? "CC",
    numeroDocumento: mall.administrador?.numeroDocumento ?? "",
    primerNombre: mall.administrador?.primerNombre ?? "",
    segundoNombre: mall.administrador?.segundoNombre ?? "",
    primerApellido: mall.administrador?.primerApellido ?? "",
    segundoApellido: mall.administrador?.segundoApellido ?? "",
    correo: mall.administrador?.correo ?? "",
    celular: mall.administrador?.celular ?? "",
    direccionAdmin: mall.administrador?.direccion ?? "",
});

export const mapEditMallFormToPayload = (form: EditMallFormData): UpdateMallPayload => ({
    mall: {
        nombreCentro: form.nombreCentro,
        direccion: form.direccionMall,
        telefono: form.telefono,
        ciudad: form.ciudad,
    },
    admin: {
        tipoDocumento: form.tipoDocumento,
        numeroDocumento: form.numeroDocumento,
        primerNombre: form.primerNombre,
        segundoNombre: form.segundoNombre,
        primerApellido: form.primerApellido,
        segundoApellido: form.segundoApellido,
        correo: form.correo,
        celular: form.celular,
        direccion: form.direccionAdmin,
    },
});