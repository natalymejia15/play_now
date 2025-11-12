import { useEffect, useState } from "react";
import { Building2, Users, UserCheck, UserCog } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { SuperAdminLayout } from "../../components/layouts/SuperAdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { useDashboardStats } from "../../hook/dashboard/use-dashboard-admin";

const COLORS = ["#3b82f6", "#10b981", "#a855f7", "#f59e0b"];

export default function SuperAdminDashboard() {
  const { stats, isLoading } = useDashboardStats();

  const [roleDistribution, setRoleDistribution] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    if (stats) {
      setRoleDistribution([
        { name: "Super Admins", value: 1 },
        { name: "Administradores", value: stats.totalAdmins },
        { name: "Clientes", value: stats.totalClients },
      ]);
    }
  }, [stats]);

  if (isLoading || !stats) {
    return (
      <SuperAdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16 mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-green-900">Panel General</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-blue-700 text-sm font-medium">
                Centros Comerciales
              </CardTitle>
              <div className="bg-blue-100 p-2 rounded-full">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">
                {stats.totalMalls}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-green-700 text-sm font-medium">
                Total Usuarios
              </CardTitle>
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                {stats.totalUsers}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-purple-700 text-sm font-medium">
                Administradores
              </CardTitle>
              <div className="bg-purple-100 p-2 rounded-full">
                <UserCog className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">
                {stats.totalAdmins}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-amber-700 text-sm font-medium">
                Clientes
              </CardTitle>
              <div className="bg-amber-100 p-2 rounded-full">
                <UserCheck className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">
                {stats.totalClients}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700">
                Centros Comerciales por Ciudad
              </CardTitle>
              <CardDescription>Distribución geográfica</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.mallsByCity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                  <XAxis dataKey="ciudad" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="shadow-md border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-700">
                Distribución de Usuarios por Rol
              </CardTitle>
              <CardDescription>Tipos de usuarios en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                    `${name}: ${((percent as number) * 100).toFixed(0)}%`
                    }
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-700">Nuevos Usuarios</CardTitle>
              <CardDescription>Tendencia mensual</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={stats.newUsersByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                    name="Usuarios Nuevos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
