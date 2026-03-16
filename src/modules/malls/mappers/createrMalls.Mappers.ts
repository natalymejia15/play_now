import type { UserFormData } from "@/interfaces";
import type { ICreateMallPayload } from "../interfaces";

export const mapCreateMallFormToPayload = (formData: UserFormData): ICreateMallPayload => ({
  mall: {
    id: 0, 
    nombreCentro: formData.nombreCentro,
    direccion: formData.direccionMall,
    telefono: formData.telefono,
    ciudad: formData.ciudad,
    created_at: new Date().toISOString(),
  },
  admin: {
    primerNombre: formData.primerNombre,
    segundoNombre: formData.segundoNombre,
    primerApellido: formData.primerApellido,
    segundoApellido: formData.segundoApellido,
    correo: formData.correo,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    celular: formData.celular,
    direccion: formData.direccionAdmin,
  },
});