import { useEffect } from "react";
import { SuperAdminLayout } from "../../components/layouts/SuperAdminLayout";

export default function SuperAdminDashboard() {
  useEffect(() => {
    document.title = "Dashboard- Play now";
  }, []);

  return (
    <SuperAdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel de super administrador</p>
      </div>
    </SuperAdminLayout>
  );
}
