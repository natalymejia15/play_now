export interface ICreateReservationsPayload {
    courtId: number;
    fechaReserva: string;
    horaReserva: string;
    cantidadHoras: number;
}

export interface ICreateReservationsRequest {
    courtId: number;
    fechaReserva: string;
    horaReserva: string;
    cantidadHoras: number;
}

export interface CreateReservationsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface CourtReservation {
  id: number;
  nombreCancha: string;
  valorHora: number;
  name?: string;
  price?: number;
} 
export interface BookingFormProps {
  selectedCourt: CourtReservation;
  onClose: () => void;
}

export interface UseCreateReservationProps {
  onOpenChange: (open: boolean) => void;
  selectedCourt: CourtReservation;
}
