export interface Mall {
  id: number;
  centroComercial: string;
  ciudad: string;
  canchas: number;
  activo: boolean;
}

export interface PropsMallTable {
  malls: Mall[];
}