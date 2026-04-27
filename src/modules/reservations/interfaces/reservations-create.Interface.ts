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