import type { PropsSportsTable } from "@/interfaces";
import { Trophy } from "lucide-react";

import { BAR_COLORS } from "@/constants";

import {
  MiniBar,
  ScrollArea,
  StatePill,
} from "../ui";

export const SportsTable = ({
  sports,
}: PropsSportsTable) => {
  const totalCanchas = (sports || []).reduce(
    (acc, sport) => {
      const raw =
        sport?.canchasAsociadas ?? "0";

      const n = Number(raw);

      return acc + (
        Number.isFinite(n) ? n : 0
      );
    },
    0
  );

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
                Deporte
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Canchas
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Ocupación
              </th>

              <th className="px-3 py-2.5 text-left font-semibold text-slate-700">
                Estado
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {sports.map((sport, index) => {
              const pct = Math.round(
                (
                  Number(
                    sport?.canchasAsociadas ?? 0
                  ) /
                  (totalCanchas || 1)
                ) * 100
              );

              const color =
                BAR_COLORS[
                index %
                BAR_COLORS.length
                ];

              return (
                <tr
                  key={sport.id}
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
                          bg-emerald-100
                        "
                      >
                        <Trophy className="h-5 w-5 text-emerald-600" />
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {sport.deporte}
                        </p>

                        <p className="text-xs text-slate-500">
                          Deporte registrado
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-3 py-2.5">

                    <div
                      className="
                        inline-flex items-center
                        rounded-full
                        bg-emerald-50
                        px-3 py-1
                        text-xs font-medium
                        text-emerald-700
                      "
                    >
                      {sport.canchasAsociadas} canchas
                    </div>

                  </td>

                  <td className="px-3 py-2.5">

                    <MiniBar
                      pct={pct}
                      color={color}
                    />

                  </td>

                  <td className="px-3 py-2.5">

                    <StatePill
                      activo={sport.activo}
                    />

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>
      </ScrollArea>
    </div>
  );
};