import { ClientLayout } from "../../components/layouts/ClientLayout";
import CrearReserva from "../../components/client/CrearReserva";

export default function CrearReservasPage() {

  return (
    <ClientLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
        </div>
        
        <CrearReserva />
      </div>
    </ClientLayout>
  );
}