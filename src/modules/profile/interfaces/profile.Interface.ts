export interface IProfile {
    id?: number;
    email: string;
    first_name: string;
    segundo_nombre: string;
    last_name: string;
    segundo_apellido: string;
    document_type: string;
    document_number: string;
    birth_date: Date | string;
    phone_number: string;
    address: string;
    business_name: string;
}

export interface ApiProfile {
  id?: number;
  correo?: string;
  email?: string;
  primerNombre?: string;
  first_name?: string;
  segundoNombre?: string;
  segundo_nombre?: string;
  primerApellido?: string;
  last_name?: string;
  segundoApellido?: string;
  segundo_apellido?: string;
  tipoDocumento?: string;
  document_type?: string;
  numeroDocumento?: string;
  document_number?: string;
  fechaNacimiento?: string;
  birth_date?: string;
  createdAt?: string;
  celular?: string;
  phone_number?: string;
  direccion?: string;
  address?: string;
  razonSocial?: string;
  nombreNegocio?: string;
  business_name?: string;
}