import { useEffect } from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";

export default function HistoryAdmin() {
    useEffect(() => {
      document.title = "Dashboard- Play now";
    }, []);
  
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Historico de reservas</h1>
        <p className="text-muted-foreground">Bienvenido al panel historico</p>
      </div>
    </AdminLayout>
  );
}