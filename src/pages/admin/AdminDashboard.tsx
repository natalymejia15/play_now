import { useEffect, useState } from "react";
import { Building2, Calendar, MapPin, Activity } from "lucide-react";
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

const COLORS = ["#3b82f6", "#10b981", "#a855f7", "#f59e0b"];

export default function AdminDashboard() {
  const [mallInfo, setMallInfo] = useState<MallInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockMall: MallInfo = {
        nombre_centro: "Centro Comercial Plaza Azul",
        ciudad: "Medellín",
        direccion: "Cra 45 #23-10",
        telefono: "604 555 1234",
      };
      setMallInfo(mockMall);
      setIsLoading(false);
    }, 1000);
  }, []);

  const reservasPorDia = [
    { name: "Lun", reservas: 5 },
    { name: "Mar", reservas: 2 },
    { name: "Mié", reservas: 7 },
    { name: "Jue", reservas: 3 },
    { name: "Vie", reservas: 8 },
    { name: "Sáb", reservas: 10 },
    { name: "Dom", reservas: 4 },
  ];

  const rendimientoCanchas = [
    { cancha: "Cancha 1", ocupacion: 85 },
    { cancha: "Cancha 2", ocupacion: 72 },
    { cancha: "Cancha 3", ocupacion: 60 },
    { cancha: "Cancha 4", ocupacion: 90 },
    { cancha: "Cancha 5", ocupacion: 50 },
  ];

  const ocupacionGlobal = [
    { name: "Ocupadas", value: 78 },
    { name: "Disponibles", value: 22 },
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
                  <Skeleton className="h-8 w-16 mt-2" />
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
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-blue-900">
          Panel del Centro Comercial
        </h1>

        {/* Cards superiores */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-blue-700 text-sm font-medium">
                Centro Comercial
              </CardTitle>
              <div className="bg-blue-100 p-2 rounded-full">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-blue-800">
                {mallInfo?.nombre_centro}
              </div>
              <p className="text-sm text-blue-700">{mallInfo?.ciudad}</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-green-700 text-sm font-medium">
                Dirección
              </CardTitle>
              <div className="bg-green-100 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-base font-semibold text-green-800">
                {mallInfo?.direccion}
              </div>
              <p className="text-sm text-green-700">{mallInfo?.telefono}</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-purple-700 text-sm font-medium">
                Canchas Activas
              </CardTitle>
              <div className="bg-purple-100 p-2 rounded-full">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">5</div>
              <p className="text-sm text-purple-700">+2 nuevas este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200 hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-amber-700 text-sm font-medium">
                Reservas del Mes
              </CardTitle>
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">42</div>
              <p className="text-sm text-amber-700">+15% respecto al mes anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficas */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700">Reservas por Día</CardTitle>
              <CardDescription>Actividad semanal</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reservasPorDia}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bfdbfe" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reservas" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-md border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-700">Rendimiento de Canchas</CardTitle>
              <CardDescription>Porcentaje de ocupación</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={rendimientoCanchas}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="cancha" type="category" />
                  <Tooltip />
                  <Bar dataKey="ocupacion" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-md border-green-200 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-green-700">Ocupación Global</CardTitle>
              <CardDescription>Promedio de uso de canchas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={ocupacionGlobal}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}%`}
                    dataKey="value"
                  >
                    {ocupacionGlobal.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
