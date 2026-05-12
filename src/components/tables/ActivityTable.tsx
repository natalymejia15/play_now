import {
  Activity,
  Building2,
  DollarSign,
  CalendarDays,
} from "lucide-react";

import { ScrollArea } from "../ui";
import type { PropsActivityTable } from "@/interfaces";

export const ActivityTable = ({
  activity,
}: PropsActivityTable) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      <ScrollArea className="h-[340px]">

        <table className="w-full text-sm">

          <thead
            className="
              sticky top-0
              z-10
              bg-slate-50
            "
          >
            <tr>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Centro Comercial
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Canchas
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Reservas
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Ingresos
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {activity.map((item) => (
              <tr
                key={item.id}
                className="
                  transition-colors
                  hover:bg-slate-50
                "
              >

                <td className="px-3 py-2.5">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        bg-cyan-100
                      "
                    >
                      <Building2 className="h-5 w-5 text-cyan-700" />
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">
                        {item.centroComercial}
                      </p>

                      <p className="text-xs text-slate-500">
                        Actividad del mes
                      </p>
                    </div>

                  </div>

                </td>

                <td className="px-3 py-2.5">

                  <div
                    className="
                      inline-flex items-center gap-1
                      rounded-full
                      bg-blue-50
                      px-3 py-1
                      text-xs font-medium
                      text-blue-700
                    "
                  >
                    <Activity className="h-3.5 w-3.5" />

                    {item.canchasTotal} canchas
                  </div>

                </td>

                <td className="px-3 py-2.5">

                  <div
                    className="
                      inline-flex items-center gap-1
                      rounded-full
                      bg-amber-50
                      px-3 py-1
                      text-xs font-medium
                      text-amber-700
                    "
                  >
                    <CalendarDays className="h-3.5 w-3.5" />

                    {item.reservasEsteMes} reservas
                  </div>

                </td>

                <td className="px-3 py-2.5">

                  <div
                    className="
                      inline-flex items-center gap-1
                      rounded-full
                      bg-emerald-50
                      px-3 py-1
                      text-xs font-medium
                      text-emerald-700
                    "
                  >
                    <DollarSign className="h-3.5 w-3.5" />

                    {item.ingresosEstimados.toLocaleString(
                      "es-CO",
                      {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      }
                    )}
                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </ScrollArea>
    </div>
  );
};