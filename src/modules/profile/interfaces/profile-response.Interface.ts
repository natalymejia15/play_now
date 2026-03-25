import type { IProfile } from "./profile.Interface";

export interface ProfileFormData{
    id: number;
    correo: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaNacimiento: Date | string;
    celular: string;
    direccion: string;
    nombreNegocio: string;
}

export const INITIAL_PROFILE: IProfile = {
     id: 0,
     email: "",
     first_name: "",
     segundo_nombre: "",
     last_name: "",
     segundo_apellido: "",
     document_type: "",
     document_number: "",
     birth_date: "",
     phone_number: "",
     address: "",
     business_name: "",
};

export const INITIAL_FORM: ProfileFormData = {
     id: 0,
     tipoDocumento: "",
     numeroDocumento: "",
     primerNombre: "",
     segundoNombre: "",
     primerApellido: "",
     segundoApellido: "",
     correo: "",
     celular: "",
     direccion: "",
     nombreNegocio: "",
     fechaNacimiento: "",
};