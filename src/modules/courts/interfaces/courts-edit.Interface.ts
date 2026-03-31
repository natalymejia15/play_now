import type { ICourts, CourtsFormData } from "./courts.Interface";

export interface UpdateCourtsPayload {
    nombreCancha: string;
    direccion: string;
    valorHora: number;
    telefono: string;
    responsable: string;
    horarioInicio: string;
    horarioFin: string;
    diasDisponibles: string;
    detalles?: string;
    capacidad: number;
    imagen: string | null;
    mallId: number | null;
}

export interface EditCourtsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    court: ICourts | null;
    onSuccess?: () => void;
}
export type EditCourtsFormData = CourtsFormData;
