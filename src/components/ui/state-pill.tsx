import type { PropsStatePill } from "@/interfaces";

export const StatePill = ({
  activo,
}: PropsStatePill) => {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
        ${
          activo
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      <span
        className={`
          mr-1 h-2 w-2 rounded-full
          ${
            activo
              ? "bg-emerald-500"
              : "bg-red-500"
          }
        `}
      />
      {activo ? "Activo" : "Inactivo"}
    </span>
  );
};