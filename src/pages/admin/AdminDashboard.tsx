import { useEffect, useState } from "react";
import { Building2, MapPin, Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAuth } from "../../hook/auth/use-auth";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

interface MallInfo {
  nombre_centro: string;
  ciudad: string;
  direccion: string;
  telefono: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [mallInfo, setMallInfo] = useState<MallInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMallInfo();
    }
  }, [user]);

  const fetchMallInfo = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockMall: MallInfo = {
        nombre_centro: "Centro Comercial Plaza Verde",
        ciudad: "Medellín",
        direccion: "Cra 45 #23-10",
        telefono: "604 555 1234",
      };
      setMallInfo(mockMall);
      setIsLoading(false);
    }, 1000);
  };

  // Datos de ejemplo
  const mockCourtStats = [
    { name: "Lun", reservas: 5 },
    { name: "Mar", reservas: 2 },
    { name: "Mié", reservas: 7 },
    { name: "Jue", reservas: 3 },
    { name: "Vie", reservas: 8 },
    { name: "Sáb", reservas: 10 },
    { name: "Dom", reservas: 4 },
  ];

  const mockCourtPerformance = [
    { cancha: "Cancha 1", ocupacion: 85 },
    { cancha: "Cancha 2", ocupacion: 72 },
    { cancha: "Cancha 3", ocupacion: 60 },
    { cancha: "Cancha 4", ocupacion: 90 },
    { cancha: "Cancha 5", ocupacion: 50 },
  ];

  // Datos para los gráficos de torta
  const pieReservasData = mockCourtStats.map((d) => ({
    name: d.name,
    value: d.reservas,
  }));

  const pieOcupacionData = [
    { name: "Ocupadas", value: 78 },
    { name: "Disponibles", value: 22 },
  ];

  const COLORS = [
    "#3b82f6",
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32 mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            {mallInfo
              ? `Centro Comercial ${mallInfo.nombre_centro}`
              : "Bienvenido al panel de administrador"}
          </p>
        </div>

        {/* Cards */}
        {mallInfo && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Centro Comercial</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{mallInfo.nombre_centro}</div>
                <p className="text-xs text-muted-foreground mt-1">{mallInfo.ciudad}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dirección</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">{mallInfo.direccion}</div>
                <p className="text-xs text-muted-foreground mt-1">{mallInfo.telefono}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Canchas Activas</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 nuevas este mes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reservas del Mes</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+15% respecto al mes anterior</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gráficos de barras */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Reservas por Día</CardTitle>
              <CardDescription>Actividad semanal</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockCourtStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reservas" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de Canchas</CardTitle>
              <CardDescription>Porcentaje de ocupación</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={mockCourtPerformance}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="cancha" type="category" />
                  <Tooltip />
                  <Bar dataKey="ocupacion" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos de torta adicionales */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Reservas</CardTitle>
              <CardDescription>Por día de la semana</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieReservasData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieReservasData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ocupación Global</CardTitle>
              <CardDescription>Promedio de uso de canchas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieOcupacionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieOcupacionData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#22c55e" : "#94a3b8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
