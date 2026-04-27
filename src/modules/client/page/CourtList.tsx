import { Button, Skeleton } from "@/components";
import { CourtCard } from "./CourtCard";
import { ArrowLeft } from "lucide-react";
import type { CourtListProps } from "../interfaces";


export function CourtList({
  courts,
  mallName,
  isLoading,
  onBack,
  onSelectCourt,
}: CourtListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full shadow-sm hover:bg-muted transition"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <h2 className="text-2xl font-bold tracking-tight text-primary">
          Canchas disponibles en {mallName}
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-2xl" />
          ))}
        </div>
      ) : courts.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">
          No hay canchas registradas en este centro comercial.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <CourtCard key={court.id} court={court} onSelect={onSelectCourt} />
          ))}
        </div>
      )}
    </div>
  );
}
