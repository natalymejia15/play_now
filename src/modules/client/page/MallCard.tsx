import { Card, CardDescription, CardHeader, CardTitle } from "@/components";
import { MapPin, Building2 } from "lucide-react";
import type { MallCardProps } from "../interfaces";

export function MallCard({ mall, onSelect }: MallCardProps) {
  return (
    <Card
      className="cursor-pointer bg-white hover:shadow-lg transition-all border border-gray-200 rounded-xl"
      onClick={() => onSelect(String(mall.id))}
    >
      <div className="bg-gradient-to-r from-blue-50/70 to-green-50/70 px-6 py-4 border-b border-border/40">
        <CardTitle className="flex items-center gap-2 text-green-700 text-lg font-semibold">
          <Building2 className="h-5 w-5 text-green-700" />
          {mall.nombreCentro}
        </CardTitle>
      </div>

      <CardHeader className="py-4">
        <CardDescription className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 text-green-600" />
          {mall.ciudad}
        </CardDescription>
         <CardDescription className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 text-green-600" />
            {mall.direccion ?? "Dirección no disponible"}
        </CardDescription>
         <CardDescription className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 text-green-600" />
         {mall.telefono ?? "N/A"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
