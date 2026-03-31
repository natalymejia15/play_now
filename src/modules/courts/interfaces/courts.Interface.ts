export interface ICourts {
    id: number;
    nombreCancha: string;
    direccion: string;
    valorHora: number;
    telefono: string;
    responsable: string;
    horarioInicio: string;
    horarioFin: string;
    diasDisponibles: string[];
    detalles?: string;
    capacidad: number;
    imagen: string | null;
    mallId: number | null;
}

export interface ApiErrorResponseCourts {
    message?: string;
    errors?: string[];
    [key: string]: unknown;
}

export type CourtsFormValue = string | number | string[] | File | null;

export interface CourtsFormData {
  nombreCancha: string;
  direccion: string;
  valorHora: number;
  telefono: string;
  responsable: string;
  horarioInicio: string;
  horarioFin: string;
  diasDisponibles: string[];
  detalles: string;
  capacidad: number;
  imagen: string | File | null;  
  mallId: string;
}

export const INITIAL_DATA_COURTS: CourtsFormData = {
    nombreCancha: "",
    direccion: "",
    valorHora: 0,
    telefono: "",
    responsable: "",
    horarioInicio: "",
    horarioFin: "",
    diasDisponibles: [],
    detalles: "",
    capacidad: 0,
    imagen: "",
    mallId: "",

} 
