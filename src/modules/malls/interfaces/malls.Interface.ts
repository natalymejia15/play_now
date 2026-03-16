export interface IMall {
  id?: number;
  nombreCentro: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  created_at: string;
  administrador?: IAdmin;
}

export interface IAdmin {
  id?: number;
  tipoDocumento: string;
  numeroDocumento: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  correo: string;
  celular: string;
  direccion: string;
}

export interface ApiErrorResponseMalls {
  message?: string;
  errors?: string[];
  [key: string]: unknown;
}


