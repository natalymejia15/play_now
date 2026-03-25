export interface ICreateDeportsPayload {
    id: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
    cantidad: number;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateDeportsRequest {
    nombre: string;
    descripcion: string;
    activo: boolean;
    cantidad: number;
}

export interface CreateDeportsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}