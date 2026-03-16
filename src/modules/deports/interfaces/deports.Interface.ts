export interface IDeport {
    id: number; 
    nombre: string;
    description: string;
    cantidad: number;
    activo: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ApiErrorResponseDeports {
  message?: string;
  errors?: string[];
  [key: string]: unknown;
}

export interface DeportsFormData {
   [key: string]: string | boolean | number;
    nombre: string;
    description: string;
    cantidad: number;
    activo: boolean;
}

export const INITIAL_DATA_DEPORTS: DeportsFormData = {
    nombre: "",
    description: "",
    cantidad: 0,
    activo: true,
}
