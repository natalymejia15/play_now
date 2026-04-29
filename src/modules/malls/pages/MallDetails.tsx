import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  User,
  Mail,
  FileText
} from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton, SuperAdminLayout } from "@/components";
import { useMalls } from "../hooks";

export const MallDetails = () => {
  const { id, fetchMallDetails, isLoading, mall, admin, getDocumentTypeLabel } = useMalls();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchMallDetails();
    }
  }, [id, fetchMallDetails]);

  if (isLoading) {
    return (
      <SuperAdminLayout>
        <div className="space-y-6 animate-pulse">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </SuperAdminLayout>
    );
  }

  if (!mall) {
    return (
      <SuperAdminLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-3xl font-semibold mb-6 text-muted-foreground">
            Centro comercial no encontrado
          </h2>
          <Button
            onClick={() => navigate("/super-admin/malls")}
            className="rounded-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la lista
          </Button>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/super-admin/malls")}
              className="rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Detalles del Centro Comercial
            </h1>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-border/60 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-100/60 to-green-50 rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Building2 className="h-5 w-5" />
                Información del Centro Comercial
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Datos generales del centro comercial registrado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 py-6">
              {[
                { icon: <Building2 />, label: "Nombre", value: mall.nombre_centro },
                { icon: <MapPin />, label: "Dirección", value: mall.direccion },
                { icon: <MapPin />, label: "Ciudad", value: mall.ciudad },
                { icon: <Phone />, label: "Teléfono", value: mall.telefono },
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
          {admin && (
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-border/60 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-100/60 to-green-50 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <User className="h-5 w-5" />
                  Administrador Asignado
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Información del administrador del centro comercial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 py-6">
                {[
                  { icon: <User />, label: "Nombre Completo", value: `${admin.first_name} ${admin.segundo_nombre ?? ""} ${admin.last_name} ${admin.segundo_apellido ?? ""}` },
                  { icon: <FileText />, label: "Documento", value: `${getDocumentTypeLabel(admin.document_type)} - ${admin.document_number}` },
                  { icon: <Mail />, label: "Email", value: admin.email },
                  { icon: <Phone />, label: "Teléfono", value: admin.phone_number },
                  { icon: <MapPin />, label: "Dirección", value: admin.address },
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
          )}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
