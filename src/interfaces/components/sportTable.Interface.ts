export interface Sport {
  id: number;
  deporte: string;
  canchasAsociadas: string;
  activo: boolean;
}

export interface PropsSportsTable {
  sports: Sport[];
}
