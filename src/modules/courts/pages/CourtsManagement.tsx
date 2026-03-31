import { Button, SuperAdminLayout } from "@/components";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CourtsTablet } from "./CourtsTable";
import { CreateCourtsDialog } from "./CreateCourtsDialog";

export const CourtsManagement = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <SuperAdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    < h1 className="text-3xl font-bold text-green-900">Gestionar de Canchas</h1>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="rounded-lg"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Nueva Cancha
                    </Button>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4">
                    <CourtsTablet />
                </div>
                <CreateCourtsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            </div>
        </SuperAdminLayout>
    );
}