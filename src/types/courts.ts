export interface Court {
  id?: number;
  nombreCancha: string;
  direccion: string;
  valorHora: number;
  telefono: string;
  responsable: string;
  horarioInicio: string;
  horarioFin: string;
  diasDisponibles: string;
  detalles?: string;
  capacidad: number;
  imagen: string | null;
  mallId: number | null;
}

export interface CourtData {
  id: string;
  nombreCancha: string;
  direccion: string;
  valorHora: number;
  telefono: string;
  responsable: string;
  horarioInicio: string;
  horarioFin: string;
  diasDisponibles: string;
  detalles?: string;
  capacidad: number;
  imagen: string | null;
}

export interface EditCourtDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  court: Court | null;
  refreshCourts: () => void;
}