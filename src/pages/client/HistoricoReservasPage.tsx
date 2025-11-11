import { ClientLayout } from "../../components/layouts/ClientLayout";
import HistorialReserva from "../../components/client/HistorialReserva";

export default function HistoricoReservasPage() {

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-green-900">Historico de reservas</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4">
          <HistorialReserva />
        </div>
      </div>
    </ClientLayout>
  );
}
