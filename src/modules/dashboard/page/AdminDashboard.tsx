import {
  Activity,
  Calendar1,
  MapPinned,
  Trophy,
} from "lucide-react";

import {
  AdminLayout,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CourtsTable,
  RecentReservationsTable,
} from "@/components";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAdminDashboard } from "../hooks";
import type { IDayStatus } from "@/interfaces";


export const AdminDashboard = () => {
  const {
    adminKpis,
    courts,
    reservations,
    topCourts,
    dayStatus,
    loading,
  } = useAdminDashboard();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Resumen operativo del centro comercial
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-cyan-200 bg-cyan-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-cyan-700">
                Total Canchas
              </CardTitle>
              <div className="rounded-full bg-cyan-100 p-2">
                <MapPinned className="h-5 w-5 text-cyan-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-800">
                {adminKpis?.totalCourts}
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700">
                Reservas Hoy
              </CardTitle>
              <div className="rounded-full bg-emerald-100 p-2">
                <Calendar1 className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-800">
                {adminKpis?.todayReservations}
              </div>
            </CardContent>
          </Card>
          <Card className="border-violet-200 bg-violet-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-violet-700">
                Reservas del Mes
              </CardTitle>
              <div className="rounded-full bg-violet-100 p-2">
                <Activity className="h-5 w-5 text-violet-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-violet-800">
                {adminKpis?.monthReservations}
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50 transition hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">
                Canchas Disponibles
              </CardTitle>
              <div className="rounded-full bg-amber-100 p-2">
                <Trophy className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">
                {adminKpis?.availableCourtNow ?? 0}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-cyan-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-cyan-700">
                Canchas Más Reservadas
              </CardTitle>
              <CardDescription>
                Ranking de reservas por cancha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={topCourts || []}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 30,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                  />

                  <XAxis type="number" />

                  <YAxis
                    type="category"
                    dataKey="cancha"
                    width={140}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="reservas"
                    fill="#06b6d4"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-emerald-700">
                Actividad del Día
              </CardTitle>

              <CardDescription>
                Reservas activas actualmente
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">

                {(dayStatus || []).map((item: IDayStatus) => (
                  <div
                    key={item.id}
                    className="
            flex items-center justify-between
            rounded-xl border p-4
            transition hover:bg-muted/40
          "
                  >
                    <div>
                      <p className="font-semibold">
                        {item.cancha}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {item.usuario}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">
                        {item.hora}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {item.duracion}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABLES */}

        <div className="grid gap-6 lg:grid-cols-2">

          <Card className="overflow-hidden border-indigo-100 shadow-sm">

            <div className="h-1 bg-indigo-500" />

            <CardHeader>
              <CardTitle className="text-indigo-700">
                Mis Canchas
              </CardTitle>

              <CardDescription>
                Canchas registradas en el centro comercial
              </CardDescription>
            </CardHeader>

            <CardContent>
              <CourtsTable courts={courts} />
            </CardContent>

          </Card>

          <Card className="overflow-hidden border-orange-100 shadow-sm">

            <div className="h-1 bg-orange-500" />

            <CardHeader>
              <CardTitle className="text-orange-700">
                Reservas Recientes
              </CardTitle>

              <CardDescription>
                Últimas reservas registradas
              </CardDescription>
            </CardHeader>

            <CardContent>
              <RecentReservationsTable
                reservations={reservations}
              />
            </CardContent>

          </Card>

        </div>

      </div>
    </AdminLayout>
  );
};