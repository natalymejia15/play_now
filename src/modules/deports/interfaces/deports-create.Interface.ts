export interface ICreateDeportsPayload {
    id: number;
    nombre: string;
    description: string;
    activo: boolean;
    cantidad: number;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateDeportsRequest {
    nombre: string;
    description: string;
    activo: boolean;
    cantidad: number;
}

export interface CreateDeportsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}