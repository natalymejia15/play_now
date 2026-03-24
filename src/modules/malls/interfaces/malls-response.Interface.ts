export interface MallData {
  id?: number;
  nombre_centro: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  created_at: string;
}

export interface AdminData {
  id: number;
  email: string;
  first_name: string;
  segundo_nombre?: string;
  last_name: string;
  segundo_apellido?: string;
  document_type: string;
  document_number: string;
  phone_number: string;
  address: string;
}
