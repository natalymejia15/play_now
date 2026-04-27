import type { ColumnDef } from "@/interfaces";
import type { IReservations } from "@/modules";

export const COLUMNS_ADMIN_RESERVATIONS: ColumnDef<IReservations>[] = [
    { key: 'cliente.numeroDocumento', label: 'Documento', defaultVisible: true },
    { key: 'cliente.correo', label: 'Correo', defaultVisible: true },
    { key: 'cliente.celular', label: 'Celular', defaultVisible: true },
    { key: 'cancha.nombreCancha', label: 'Cancha', defaultVisible: true },
    { key: 'cancha.direccion', label: 'Dirección', defaultVisible: true },
    { key: 'fechaReserva', label: 'Fecha de Reserva', defaultVisible: false },
    { key: 'horaReserva', label: 'Hora de Reserva', defaultVisible: false },
    { key: 'estado', label: 'Estado', defaultVisible: false },
    { key: 'cantidadHoras', label: 'Cantidad Horas', defaultVisible: false },
]

export const PRYMARY_ADMIN_RESERVATIONS: ColumnDef<IReservations> = {
  key: 'cliente.primerNombre',
  label: 'Cliente',
  render: (row) => `${row.cliente.primerNombre} ${row.cliente.primerApellido}`
};