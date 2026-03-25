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
    celular: string;
    direccion: string;
    razonSocial: string;
}

export const INITIAL_PROFILE: IProfile = {
     id: 0,
     correo: "",
     primerNombre: "",
     segundoNombre: "",
     primerApellido: "",
     segundoApellido: "",
     tipoDocumento: "",
     numeroDocumento: "",
     celular: "",
     direccion: "",
     razonSocial: "",
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
     razonSocial: "",
};