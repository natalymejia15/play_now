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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

interface DashboardStats {
  totalMalls: number;
  totalUsers: number;
  totalAdmins: number;
  totalClients: number;
  mallsByCity: { ciudad: string; count: number }[];
  usersByMonth: { month: string; count: number }[];
  roleDistribution: { name: string; value: number }[];
  newUsers: { mes: string; count: number }[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carga inicial
    setTimeout(() => {
      const mockStats: DashboardStats = {
        totalMalls: 8,
        totalUsers: 125,
        totalAdmins: 15,
        totalClients: 110,
        mallsByCity: [
          { ciudad: "Bogotá", count: 3 },
          { ciudad: "Medellín", count: 2 },
          { ciudad: "Cali", count: 2 },
          { ciudad: "Barranquilla", count: 1 },
        ],
        usersByMonth: [
          { month: "Jun", count: 12 },
          { month: "Jul", count: 18 },
          { month: "Ago", count: 22 },
          { month: "Sep", count: 30 },
          { month: "Oct", count: 25 },
          { month: "Nov", count: 18 },
        ],
        roleDistribution: [
          { name: "Super Admins", value: 3 },
          { name: "Administradores", value: 15 },
          { name: "Clientes", value: 110 },
        ],
        newUsers: [
          { mes: "Enero", count: 10 },
          { mes: "Febrero", count: 20 },
          { mes: "Marzo", count: 30 },
          { mes: "Abril", count: 45 },
          { mes: "Mayo", count: 65 },
          { mes: "Junio", count: 90 },
        ],

      };

      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Centros Comerciales
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalMalls}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalAdmins}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalClients}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Centros Comerciales por Ciudad</CardTitle>
              <CardDescription>Distribución geográfica</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.mallsByCity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ciudad" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Usuarios por Rol</CardTitle>
              <CardDescription>Tipos de usuarios en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats?.roleDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name}: ${((percent as number) * 100).toFixed(0)}%`
                    }
                    dataKey="value"
                  >
                    {stats?.roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Nuevos Usuarios</CardTitle>
              <CardDescription>Tendencia de crecimiento mensual</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats?.newUsers}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* Línea principal */}
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                    fillOpacity={1}
                    fill="url(#colorGrowth)" // 💡 relleno degradado bajo la línea
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
