export interface Admin {
  id: number;
  nombre: string;
  initials: string;
  mall: string;
  canchas: number;
  activo: boolean;
}

export interface PropsAdminsTable {
  admins: Admin[];
}