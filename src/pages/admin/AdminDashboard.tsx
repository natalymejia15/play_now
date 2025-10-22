import { AdminLayout } from "../../components/layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel de administrador</p>
      </div>
    </AdminLayout>
  );
}
