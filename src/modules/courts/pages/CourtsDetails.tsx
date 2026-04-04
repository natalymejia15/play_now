import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Info,
  ImageIcon,
  DollarSign,
  LandPlot,
  Trophy,
} from "lucide-react";
import { AdminLayout, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from "@/components";
import { useCourtImage, useCourts } from "../hooks";

export const CourtsDetails = () => {
  const { id, fetchCourtsDetails, isLoading, court } = useCourts();
  const navigate = useNavigate();
  const { imageUrl } = useCourtImage({ imagen: court?.imagen ?? null });

  useEffect(() => {
    if (id) {
      fetchCourtsDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6 animate-pulse">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </AdminLayout>
    );
  }

  if (!court) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-3xl font-semibold mb-6 text-muted-foreground">
            Cancha no encontrada
          </h2>
          <Button
            onClick={() => navigate("/admin/courts")}
            className="gap-2 rounded-full shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la lista
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/courts")}
              className="rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Detalles de la Cancha
            </h1>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-border/60 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-100/60 to-green-50 rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Info className="h-5 w-5" />
                Información General
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Datos generales de la cancha registrada
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 py-6">
              {[
                {
                  icon: <LandPlot />,
                  label: "Nombre de la Cancha",
                  value: court.nombreCancha,
                },
                { icon: <User />, label: "Responsable", value: court.responsable },
                { icon: <MapPin />, label: "Dirección", value: court.direccion },
                { icon: <Phone />, label: "Teléfono", value: court.telefono },
                {
                  icon: <Calendar />,
                  label: "Días Disponibles",
                  value: court.diasDisponibles,
                },
                {
                  icon: <Clock />,
                  label: "Horario",
                  value: `${court.horarioInicio} - ${court.horarioFin}`,
                },
                {
                  icon: <DollarSign />,
                  label: "Valor por Hora",
                  value: `$${court.valorHora.toLocaleString()}`,
                },
                {
                  icon: <Trophy />,
                  label: "Deporte",
                  value: court.deporteNombre ?? `${court.sportId ?? "-"}`,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/40 transition"
                >
                  <div className="text-green-700 mt-1">{item.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-base font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-border/60 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-100/60 to-green-50 rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <ImageIcon className="h-5 w-5" />
                Imagen de la Cancha
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Vista representativa del espacio deportivo
              </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-center items-center py-6">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={court.nombreCancha}
                 className="rounded-2xl shadow-md object-cover w-full max-w-md h-[500px]"
                />
              ) : (
                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl w-full max-w-md h-64 bg-muted/10">
                  <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Sin imagen disponible</p>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
