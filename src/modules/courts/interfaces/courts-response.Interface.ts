export interface CourtsData {
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
    mallId: number | null;
    deporteNombre?: string | null;
    cantidadCancha?: number | null;
}