export interface ICreateCourtsRequest {
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
}


export interface CreateCourtsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}