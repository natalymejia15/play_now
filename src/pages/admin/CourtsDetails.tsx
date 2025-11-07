import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, Info, ImageIcon, DollarSign, Users, LandPlot } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { useCourt } from "../../hook/courts/use-courts";
import { AdminLayout } from "../../components/layouts/AdminLayout";

export default function CourtDetailsPage() {
    const { id, fetchCourtsDetails, isLoading, court, API_URL_IMAGE } = useCourt();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchCourtsDetails();
        }
    }, [id]);

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="space-y-6">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-[400px] w-full" />
                </div>
            </AdminLayout>
        );
    }

    if (!court) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Cancha no encontrada</h2>
                    <Button onClick={() => navigate("/admin/courts")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a la lista
                    </Button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => navigate("/admin/courts")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Button>
                    <h1 className="text-3xl font-bold">Detalles de la Cancha</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                Información General
                            </CardTitle>
                            <CardDescription>Datos registrados de la cancha</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-2">
                                <LandPlot className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Cancha</p>
                                    <p className="text-base">{court.nombreCancha}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <User className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Responsable</p>
                                    <p className="text-base">{court.responsable}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                                    <p className="text-base">{court.direccion}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                                    <p className="text-base">{court.telefono}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Días disponibles</p>
                                    <p className="text-base">{court.diasDisponibles}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Horario</p>
                                    <p className="text-base">
                                        {court.horarioInicio} - {court.horarioFin}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Valor por hora</p>
                                    <p className="text-base">${court.valorHora.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Capacidad</p>
                                    <p className="text-base">{court.capacidad} personas</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-primary" />
                                Imagen de la Cancha
                            </CardTitle>
                            <CardDescription>Vista representativa del espacio deportivo</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            {court.imagen ? (
                                <img
                                    src={`${API_URL_IMAGE}/uploads/${court.imagen}`}
                                    alt={court.nombreCancha}
                                    className="rounded-2xl shadow-md object-cover w-full max-w-md h-64"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl w-full max-w-md h-64">
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
