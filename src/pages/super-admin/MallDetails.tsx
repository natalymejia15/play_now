import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Phone, User, Mail, FileText } from "lucide-react";
import { SuperAdminLayout } from "../../components/layouts/SuperAdminLayout";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { useMalls } from "../../hook/malls/use-mall";



export default function MallDetails() {
  const { id, fetchMallDetails, isLoading, mall, admin, getDocumentTypeLabel } = useMalls()
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchMallDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <SuperAdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </SuperAdminLayout>
    );
  }

  if (!mall) {
    return (
      <SuperAdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Centro comercial no encontrado</h2>
          <Button onClick={() => navigate("/super-admin/malls")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la lista
          </Button>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/super-admin/malls")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold">Detalles del Centro Comercial</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Información del Centro Comercial
              </CardTitle>
              <CardDescription>Datos del centro comercial registrado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                    <p className="text-base">{mall.nombre_centro}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                    <p className="text-base">{mall.direccion}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ciudad</p>
                    <p className="text-base">{mall.ciudad}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                    <p className="text-base">{mall.telefono}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {admin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Administrador Asignado
                </CardTitle>
                <CardDescription>Información del administrador del centro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nombre Completo</p>
                      <p className="text-base">
                        {admin.first_name} {admin.segundo_nombre} {admin.last_name} {admin.segundo_apellido}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Documento</p>
                      <p className="text-base">
                        {getDocumentTypeLabel(admin.document_type)} - {admin.document_number}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-base">{admin.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                      <p className="text-base">{admin.phone_number}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                      <p className="text-base">{admin.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SuperAdminLayout>
  );
}