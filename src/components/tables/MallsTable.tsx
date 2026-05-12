import type { PropsMallTable } from "@/interfaces";

import {
  Building2,
  MapPin,
} from "lucide-react";

import {
  ScrollArea,
  StatePill,
} from "../ui";

export const MallsTable = ({
  malls,
}: PropsMallTable) => {
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
                Ciudad
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Canchas
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Estado
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {malls.map((mall) => (
              <tr
                key={mall.id}
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
                        bg-blue-100
                      "
                    >
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">
                        {mall.centroComercial}
                      </p>

                      <p className="text-xs text-slate-500">
                        Centro comercial
                      </p>
                    </div>

                  </div>

                </td>

                <td className="px-3 py-2.5">

                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4" />

                    <span>{mall.ciudad}</span>
                  </div>

                </td>

                <td className="px-3 py-2.5">

                  <div
                    className="
                      inline-center items-center
                      rounded-full
                      bg-blue-100
                      px-6 py-1
                      text-xs font-medium
                      text-blue-700
                    "
                  >
                    {mall.canchas}
                  </div>

                </td>

                <td className="px-3 py-2.5">
                  <StatePill activo={mall.activo} />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </ScrollArea>
    </div>
  );
};