export interface IReservations {
    id: number;
    fechaReserva: string;
    horaReserva: string;
    cantidadHoras: number;
    valorTotal: string;
    estado: string;
    courtId: number;
    userId: number;
    cancha: {
        id: number;
        nombreCancha: string;
        direccion: string;
        valorHora: number;
        horarioInicio: string;
        horarioFin: string;
        mallId: number;
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
    id: number;
    fechaReserva: string;
    horaReserva: string;
    cantidadHoras: number;
    valorTotal: string;
    estado: string;
    courtId: number;
    userId: number;
    cancha: {
        id: number;
        nombreCancha: string;
        direccion: string;
        valorHora: number;
        horarioInicio: string;
        horarioFin: string;
        mallId: number;
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

export const INITIAL_DATA_RESERVATIONS: ReservationsFormData = {
    id: 0,
    fechaReserva: "",
    horaReserva: "",
    cantidadHoras: 0,
    valorTotal: "",
    estado: "",
    courtId: 0,
    userId: 0,
    cancha: {
        id: 0,
        nombreCancha: "",
        direccion: "",
        valorHora: 0,
        horarioInicio: "",
        horarioFin: "",
        mallId: 0,
    }, 
    cliente: {
        id: 0,
        primerNombre: "",
        primerApellido: "",
        correo: "",
        celular: "",
        numeroDocumento: "",
    },
}