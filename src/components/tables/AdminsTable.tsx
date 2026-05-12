import type { PropsAdminsTable } from "@/interfaces";

import {
  Avatar,
  ScrollArea,
  StatePill,
} from "../ui";

export const AdminsTable = ({
  admins,
}: PropsAdminsTable) => {
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
      <ScrollArea className="h-[400px]">

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
                Administrador
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Centro Comercial
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

            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="
                  transition-colors
                  hover:bg-slate-50
                "
              >

                <td className="px-3 py-2.5">

                  <div className="flex items-center gap-3">

                    <Avatar initials={admin.initials} />

                    <div>
                      <p className="font-medium text-slate-800">
                        {admin.nombre}
                      </p>

                      <p className="text-xs text-slate-500">
                        Administrador
                      </p>
                    </div>

                  </div>

                </td>

                <td className="px-3 py-2.5">
                  {admin.mall}
                </td>

                <td className="px-3 py-2.5">

                  <div
                    className="
                      inline-flex items-center
                      rounded-full
                      bg-purple-50
                      px-3 py-1
                      text-xs font-medium
                      text-purple-700
                    "
                  >
                    {admin.canchas} canchas
                  </div>

                </td>

                <td className="px-3 py-2.5">
                  <StatePill activo={admin.activo} />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </ScrollArea>
    </div>
  );
};