import type { ColumnDef } from "@/interfaces";
import type { ICourts } from "@/modules";

export const COLUMNS_COURTS: ColumnDef<ICourts>[] = [
    { key: "direccion", label: "Dirección", defaultVisible: false},
    { key: "telefono", label: "Teléfono", defaultVisible: false },
    { key: "responsable", label: "Responsable" },
    { key: "capacidad", label: "Capacidad" },
    { key: "horarioInicio", label: "Horario de Inicio" },
    { key: "horarioFin", label: "Horario Fin" },
    { key: "diasDisponibles", label: " Días disponibles", defaultVisible: false },


]

export const PRIMARY_COURTS: ColumnDef<ICourts> = { key: "nombreCancha", label: "Cancha" };