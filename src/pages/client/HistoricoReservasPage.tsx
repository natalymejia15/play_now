import { ClientLayout } from "../../components/layouts/ClientLayout";
import HistorialReserva from "../../components/client/HistorialReserva";

export default function HistoricoReservasPage() {

  return (
    <ClientLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
        </div>
        
        <HistorialReserva />
      </div>
    </ClientLayout>
  );
}
