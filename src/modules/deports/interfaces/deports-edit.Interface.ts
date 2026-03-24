import type { IDeport } from "./deports.Interface";

export interface EditDeportsFormData {  
    [key: string]: string | number | boolean;
    nombre: string;
    description: string;
    cantidad: number;
    activo: boolean;
    
}

export interface EditDeportsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    deport: IDeport | null;
    onSuccess?: () => void;
}


export interface UpdateDeportsPayload {
    nombre: string;
    description: string;
    cantidad: number;
    activo: boolean;
}