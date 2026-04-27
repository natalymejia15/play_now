import type { ICreateReservationsRequest, ReservationsFormData } from "../interfaces";

export const mapCreateReservationsFormToPayload = (formData: ReservationsFormData): ICreateReservationsRequest => {
    return {
        courtId: formData.courtId,
        fechaReserva: formData.fechaReserva,
        horaReserva: formData.horaReserva,
        cantidadHoras: formData.cantidadHoras,
    };
}