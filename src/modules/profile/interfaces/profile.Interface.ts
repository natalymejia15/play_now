export interface IProfile {
    id?: number;
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

export interface ApiProfile {
  id?: number;
  correo?: string;
  email?: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  createdAt?: string;
  celular?: string;
  direccion?: string;
  razonSocial?: string;
}