import type { IAdmin, IMall } from "./malls.Interface";

export interface ICreateMallPayload {
    mall: IMall;
    admin: IAdmin;
}

export interface CreateMallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface CreateMallFormData {
  [key: string]: string;  
  nombreCentro: string;
  ciudad: string;
  direccionMall: string;
  telefono: string;
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