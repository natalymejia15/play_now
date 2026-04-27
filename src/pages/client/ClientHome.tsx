import { useState } from "react";
import { Search } from "lucide-react";
import { ClientLayout } from "../../components/layouts/client/ClientLayout";
import { Input } from "../../components/ui/input";
import { MallList } from "../../components/client/mall/MallList";
import { CourtList } from "../../components/client/courts/CourtList";
import { ReservationsForm, useCourts, useMallReservation } from "@/modules";

export default function ClientHome() {
  const { malls, isLoading: loadingMalls } = useMallReservation();
  const { courts, isLoading: loadingCourts, fetchCourtsByMall } = useCourts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMall, setSelectedMall] = useState<any>(null);
  const [selectedCourt, setSelectedCourt] = useState<any>(null);

  const filteredMalls = malls.filter((mall) =>
    mall.nombreCentro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMallSelect = (mallId: string) => {
    const mall = malls.find((m) => m.id === Number(mallId));
    setSelectedMall(mall);
    fetchCourtsByMall(mallId);
  };

  return (
    <ClientLayout>
      <div className="max-w-6xl mx-auto space-y-8 py-10 animate-in fade-in duration-200">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            ¡Reserva tu cancha favorita!
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Busca un centro comercial, explora las canchas disponibles y asegura tu espacio en minutos.
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre del centro comercial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-sm focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
        </div>
        <div className="mt-10 animate-in slide-in-from-bottom duration-300">
          {!selectedMall ? (
            <MallList
              malls={filteredMalls}
              isLoading={loadingMalls}
              onSelectMall={handleMallSelect}
            />
          ) : (
            <div className="space-y-6">

              <CourtList
                courts={courts}
                mallName={selectedMall.nombreCentro}
                isLoading={loadingCourts}
                onBack={() => setSelectedMall(null)}
                onSelectCourt={setSelectedCourt}
              />
            </div>
          )}
        </div>

        {!loadingMalls && !selectedMall && filteredMalls.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            <p className="text-lg">No se encontraron centros comerciales con ese nombre.</p>
          </div>
        )}
        {selectedCourt && (
          <ReservationsForm
            selectedCourt={selectedCourt}
            onClose={() => setSelectedCourt(null)}
          />
        )}
      </div>
    </ClientLayout>
  );
}
