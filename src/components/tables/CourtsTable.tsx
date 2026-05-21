import {
    MapPinned,
    DollarSign,
} from "lucide-react";

import {
    ScrollArea,
    StatePill,
} from "../ui";
import type { PropsCourtsTable } from "@/interfaces";

export const CourtsTable = ({
    courts,
}: PropsCourtsTable) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-border">
            <ScrollArea className="h-[360px] w-full">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10 bg-muted/70 backdrop-blur">
                        <tr className="border-b">
                            <th className="px-4 py-3 text-left font-semibold">
                                Cancha
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Precio
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {courts?.map((court) => (
                            <tr
                                key={court.id}
                                className="
                  border-b
                  transition-colors
                  hover:bg-muted/30
                "
                            >

                                <td className="px-4 py-3">

                                    <div className="flex items-center gap-3">

                                        <div
                                            className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl bg-cyan-100
                      "
                                        >
                                            <MapPinned className="h-5 w-5 text-cyan-600" />
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {court.cancha}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {court.deporte}
                                            </p>
                                        </div>

                                    </div>

                                </td>

                                <td className="px-4 py-3">

                                    <div
                                        className="
                      inline-flex items-center gap-1 rounded-full
                      bg-emerald-50 px-3 py-1
                      text-xs font-medium text-emerald-700
                    "
                                    >
                                        <DollarSign className="h-3 w-3" />

                                        {court.valorHora}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <StatePill activo={court.estado} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ScrollArea>
        </div>
    );
};