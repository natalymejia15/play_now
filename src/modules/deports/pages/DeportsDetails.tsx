import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton, SuperAdminLayout } from "@/components";
import { useDeports } from "../hooks";

export const DeportsDetails = () => {
    const { deport, isLoading, id, fetchDeportsDetails } = useDeports();
    useEffect(() => {
        if (id) {
            fetchDeportsDetails();
        }
    }, [id, fetchDeportsDetails]);
    const navigate = useNavigate();

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
    if (!deport) {
        return (
            <SuperAdminLayout>
                <div className="flex flex-col items-center justify-center py-20">
                    <h2 className="text-3xl font-semibold mb-6 text-muted-foreground">
                        Deporte no encontrado
                    </h2>
                    <Button
                        onClick={() => navigate("/super-admin/deports")}
                        className="gap-2"
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
                            onClick={() => navigate("/super-admin/deports")}
                            className="rounded-lg"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Volver
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">
                            Detalles del Deporte
                        </h1>
                    </div>
                </div>
                <div>
                    <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-border/60 rounded-2xl">
                        <CardHeader className="bg-gradient-to-r from-blue-100/60 to-green-50 rounded-t-2xl">
                            <CardTitle className="flex items-center gap-2 text-green-700">
                                <Building2 className="h-5 w-5" />
                                Información del Deporte
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                Datos generales del deporte
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 py-6">
                            {[
                                { icon: <Building2 />, label: "Nombre", value: deport?.nombre },
                                { icon: <MapPin />, label: "Descripción", value: deport?.descripcion },
                                { icon: <MapPin />, label: "Cantidad", value: deport?.cantidad },
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
                </div>
            </div>
        </SuperAdminLayout>

    );
};