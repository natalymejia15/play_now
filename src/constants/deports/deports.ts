import type { ColumnDef } from "@/interfaces";
import type { IDeport } from "@/modules";

export const COLUMNS_DEPORTS: ColumnDef<IDeport>[] = [
  { key: "descripcion", label: "Descripción", defaultVisible: false },
  { key: "cantidad", label: "Cantidad", render: (d) => d.cantidad.toString() },
  { key: "activo", label: "Activo" },
];

export const PRIMARY_DEPORTS: ColumnDef<IDeport> = { key: "nombre", label: "Deporte" };