import type { IMall } from "./malls.Interface";

export interface EditMallDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mall: IMall | null;
    onSuccess?: () => void;
}

export interface EditMallFormData {
    nombreCentro: string;
    direccionMall: string;
    telefono: string;
    ciudad: string;
    tipoDocumento: string;
    numeroDocumento: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    correo: string;
    celular: string;
    direccionAdmin: string;
}

export interface UpdateMallPayload {
    mall: {
        nombreCentro: string;
        direccion: string;
        telefono: string;
        ciudad: string;
    };
    admin: {
        tipoDocumento: string;
        numeroDocumento: string;
        primerNombre: string;
        segundoNombre: string;
        primerApellido: string;
        segundoApellido: string;
        correo: string;
        celular: string;
        direccion: string;
    };
}