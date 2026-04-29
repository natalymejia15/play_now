export interface ICourts {
    id: number;
    nombreCancha: string;
    direccion: string;
    valorHora: number;
    telefono: string;
    responsable: string;
    horarioInicio: string;
    horarioFin: string;
    diasDisponibles: string;
    detalles?: string;
    sportId: number | null;
    imagen: string | null;
    activo: boolean;
    mallId: number | null;
    deporte?: {
        id: number;
        nombre: string;
        descripcion?: string;
        cantidad?: number;
    } | null;
    deporteNombre?: string | null;
    cantidadCancha?: number | null;
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
    sportId: number | string | null;
    imagen: string | File | null;
    mallId: number | string | null;
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
    sportId: "",
    imagen: "",
    mallId: "",

} 
