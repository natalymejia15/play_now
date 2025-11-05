import type { IAdmin } from "./admin";

export interface IMall {
  id?: number;
  nombreCentro: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  administrador?: IAdmin;
}


export interface MallData {
  id: string;
  nombre_centro: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  created_at: string;
}

export interface AdminData {
  id: string;
  email: string;
  first_name: string;
  segundo_nombre: string;
  last_name: string;
  segundo_apellido: string;
  document_type: string;
  document_number: string;
  phone_number: string;
  address: string;
}