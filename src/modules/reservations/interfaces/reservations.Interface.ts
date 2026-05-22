export interface IReservations {
    id: number;
    fechaReserva: string;
    horaReserva: string;
    cantidadHoras: number;
    valorTotal: string;
    estado: string;
    courtId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    cancha: {
        id: number;
        nombreCancha: string;
        direccion: string;
        valorHora: number;
        horarioInicio: string;
        horarioFin: string;
        mall: {
            id: number;
            nombreCentro: string;
        }
    };
    cliente: {
        id: number;
        primerNombre: string;
        primerApellido: string;
        correo: string;
        celular: string;
        numeroDocumento: string;
    };
}

export interface ApiErrorResponseReservations {
    message?: string;
    errors?: string[];
    [key: string]: unknown;
}

export interface ReservationsFormData {
    courtId: number;
  fechaReserva: string;
  horaReserva: string;
  cantidadHoras: number;

  full_name: string;
  userLegalId: string;
  userLegalIdType: string;
  financialInstitutionCode: string;
  phone_number: string;
}

export const INITIAL_DATA_RESERVATIONS: ReservationsFormData = {
    courtId: 0,
  fechaReserva: "",
  horaReserva: "",
  cantidadHoras: 1,

  full_name: "",
  userLegalId: "",
  userLegalIdType: "",
  financialInstitutionCode: "",
  phone_number: ""

}