import type { ColumnDef } from "@/interfaces";
import type { IMall } from "@/modules";

export const COLUMNS_MALLS: ColumnDef<IMall>[] = [
  { key: "direccion", label: "Dirección" },
  { key: "telefono", label: "Teléfono", defaultVisible: false },
  { key: "ciudad", label: "Ciudad" },
  {
    key: "administrador",
    label: "Administrador",
    render: (m) => m.administrador
      ? `${m.administrador.primerNombre} ${m.administrador.primerApellido}`
      : "Sin asignar",
  },
  { key: "correo", label: "Correo", render: (m) => m.administrador?.correo ?? "-" },
  { key: "celular", label: "Celular", render: (m) => m.administrador?.celular ?? "-" },
];

export const PRIMARY_MALLS: ColumnDef<IMall> = { key: "nombreCentro", label: "Centro Comercial" };