import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button, Skeleton, SuperAdminLayout } from "@/components";
import { useDeports } from "../hooks";

export const DeportsDetails = () => {
    const { deports, fetching } = useDeports();
    const navigate = useNavigate();

    if (fetching) {
        return (
            <SuperAdminLayout>
                <div className="space-y-6 animate-pulse">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
            </SuperAdminLayout>
        );
    }
    if (!deports) {
        return (
            <SuperAdminLayout>
                <div className="flex flex-col items-center justify-center py-20">
                    <h2 className="text-3xl font-semibold mb-6 text-muted-foreground">
                        Deportes no encontrados
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
            </div>
        </SuperAdminLayout>

    );
};