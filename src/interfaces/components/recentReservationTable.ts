export interface Reservation {
    id: number;
    usuario: string;
    cancha: string;
    deporte: string;
    fecha: Date;
    hora: string;
    duracion: string;
    estado: string
}

export interface IDayStatus {
  id: number;
  cancha: string;
  usuario: string;
  hora: string;
  duracion: string;
  estado: string;
  fecha: string;
}

export interface PropsRecentReservations {
    reservations: Reservation[];
}