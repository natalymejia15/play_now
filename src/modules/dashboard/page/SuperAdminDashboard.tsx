import {
  Building2,
  Trophy,
  MapPinned,
  Calendar,
  BarChart3,
} from "lucide-react";
import {
  AdminsTable,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  MallsTable,
  SportsTable,
  SuperAdminLayout,
} from "@/components";
import { useSuperAdminDashboard } from "../hooks";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

export const SuperAdminDashboard =() =>{
  const {
    kpis,
    malls,
    sports,
    admins,
    loading,
    activity
  } = useSuperAdminDashboard();
  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-green-900">Dashboard</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-blue-200 bg-blue-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Centros Comerciales
              </CardTitle>
              <div className="rounded-full bg-blue-100 p-2">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">
                {kpis?.totalMalls}
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Deportes
              </CardTitle>
              <div className="rounded-full bg-green-100 p-2">
                <Trophy className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                {kpis?.totalSports}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Canchas Activas
              </CardTitle>
              <div className="rounded-full bg-purple-100 p-2">
                <MapPinned className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">
                {kpis?.totalActiveCourts}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">
                Reservas del Mes
              </CardTitle>
              <div className="rounded-full bg-amber-100 p-2">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">
                {kpis?.monthReservations}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="border-emerald-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-emerald-700">
                  Ingresos por Centro Comercial
                </CardTitle>
                <CardDescription>
                  Ingresos estimados del mes
                </CardDescription>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3">
                <BarChart3 className="h-5 w-5 text-emerald-700" />
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={activity}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 40,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                  />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="centroComercial"
                    type="category"
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <Bar
                    dataKey="ingresosEstimados"
                    fill="#10b981"
                    radius={[0, 6, 6, 0]}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="border-cyan-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-cyan-700">
                  Reservas por Centro Comercial
                </CardTitle>
                <CardDescription>
                  Reservas realizadas este mes
                </CardDescription>
              </div>
              <div className="rounded-xl bg-cyan-100 p-3">
                <Calendar className="h-5 w-5 text-cyan-700" />
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={activity}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 40,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                  />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="centroComercial"
                    type="category"
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <Bar
                    dataKey="reservasEsteMes"
                    fill="#06b6d4"
                    radius={[0, 6, 6, 0]}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="overflow-hidden border-blue-100 shadow-sm">
            <div className="h-1 bg-blue-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl text-blue-800">
                  Centros Comerciales
                </CardTitle>
                <p className="text-sm text-blue-600/70">
                  Gestión de centros registrados
                </p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <MallsTable malls={malls} />
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-green-100 shadow-sm">
            <div className="h-1 bg-green-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl text-green-800">
                  Deportes
                </CardTitle>
                <p className="text-sm text-green-600/70">
                  Deportes disponibles en el sistema
                </p>
              </div>
              <div className="rounded-xl bg-green-100 p-3">
                <Trophy className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <SportsTable sports={sports} />
            </CardContent>
          </Card>
        </div>
        <Card className="overflow-hidden border-purple-100 shadow-sm">
          <div className="h-1 bg-purple-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl text-purple-800">
                Administradores
              </CardTitle>
              <p className="text-sm text-purple-600/70">
                Administradores activos del sistema
              </p>
            </div>
            <div className="rounded-xl bg-purple-100 p-3">
              <MapPinned className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <AdminsTable admins={admins} />
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}