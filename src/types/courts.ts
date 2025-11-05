export interface Court {
  id: number;
  nombreCancha: string;
  direccion: string;
  valorHora: number;
  telefono: string;
  responsable: string;
  horarioInicio: string;
  horarioFin: string;
  diasDisponibles: string;
  capacidad: number;
  imagen: string | null;
  mallId: number | null;
}
