import { Card, CardDescription, CardHeader, CardTitle } from "@/components";
import { Users, DollarSign, ImageIcon, Clock } from "lucide-react";
import type { CourtCardProps } from "../interfaces";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function CourtCard({ court, onSelect }: CourtCardProps) {
  const imageUrl = court.imagen
    ? court.imagen.startsWith("http")
      ? court.imagen
      : `${API_URL}/uploads/${encodeURIComponent(court.imagen)}`
    : null;

  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-border/60 hover:shadow-lg hover:border-primary/40 transition-all duration-300"
      onClick={() => onSelect(court)}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={court.nombreCancha}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center justify-center bg-muted h-48 text-muted-foreground">
          <ImageIcon className="h-8 w-8 mb-2" />
          <p className="text-sm">Sin imagen disponible</p>
        </div>
      )}

      <CardHeader className="bg-gradient-to-r from-blue-50/60 to-green-50/50">
        <CardTitle className="text-lg font-semibold text-green-700">
          {court.nombreCancha}
        </CardTitle>

        <CardDescription className="space-y-2 mt-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-sm">
              Capacidad:{" "}
              <span className="font-medium text-foreground">
                {court.sportId} personas
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-green-700 font-semibold">
            <DollarSign className="h-4 w-4" />
            ${court.valorHora.toLocaleString()} por hora
          </div>
           <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-green-600" />
            <span className="text-sm">
              Horarios:{" "}
              <span className="font-medium text-foreground">
                {court.horarioInicio} hasta {court.horarioFin}
              </span>
            </span>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
