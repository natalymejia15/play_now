import type { ColumnDef } from "@/interfaces";
import type { IDeport } from "@/modules";
import React from "react";
import { Switch } from "@/components";
import { updateDeports } from "@/api";
import { toast } from "@/lib";

export const COLUMNS_DEPORTS: ColumnDef<IDeport>[] = [
  { key: "descripcion", label: "Descripción", defaultVisible: false },
  { key: "cantidad", label: "Cantidad", render: (d) => d.cantidad.toString() },
  {
    key: "activo",
    label: "Activo",
    render: (d) =>
      React.createElement(Switch, {
        checked: d.activo,
        onCheckedChange: async (checked: boolean) => {
          try {
            await updateDeports(d.id, {
              nombre: d.nombre,
              descripcion: d.descripcion,
              cantidad: d.cantidad,
              activo: checked,
            });
            toast({ title: "Actualizado", description: `Estado actualizado: ${d.nombre}`, variant: "success" });
          } catch (error) {
            toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" });
          }
        },
      }),
  },
];

export const PRIMARY_DEPORTS: ColumnDef<IDeport> = { key: "nombre", label: "Deporte" };