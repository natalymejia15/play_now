export interface Admin {
  id: number;
  nombre: string;
  initials: string;
  centroAsignado: string;
  correo: string;
  activo: boolean;
}

export interface PropsAdminsTable {
  admins: Admin[];
}