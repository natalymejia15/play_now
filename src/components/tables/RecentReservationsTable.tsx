import type { PropsRecentReservations } from "@/interfaces";
import {
  Avatar,
  ScrollArea,
} from "../ui";

export const RecentReservationsTable = ({
  reservations,
}: PropsRecentReservations) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <ScrollArea className="h-[360px] w-full">
        <div className="space-y-3 p-4">
          {(reservations || []).map((reservation) => {
            const fechaObj = new Date(reservation.fecha as any);
            const fechaStr = isNaN(fechaObj.getTime())
              ? ""
              : fechaObj.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

            return (
              <div
                key={reservation.id}
                className="
                  flex items-center justify-between
                  rounded-2xl border bg-background
                  p-4 transition-all
                  hover:bg-muted/30
                "
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={
                      reservation.usuario
                        ?.split(" ")
                        ?.map((n: string) => n[0])
                        ?.join("")
                    }
                  />
                  <div>
                    <p className="font-medium">
                      {reservation.usuario}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {reservation.cancha}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {fechaStr}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {reservation.hora}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {reservation.estado}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};