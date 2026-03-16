import { useState } from "react";
import { SuperAdminLayout } from "../../../components/layouts/SuperAdminLayout";
import { Plus } from "lucide-react";
import { MallsTable } from "./MallTablet";
import { CreateMallDialog } from "./CreateMallDialog";
import { Button } from "@/components";

export const MallsManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-green-900">Gestionar Centros Comerciales</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="rounded-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Nuevo Centro Comercial
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4">
          <MallsTable />
        </div>
        <CreateMallDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </SuperAdminLayout>
  );
}
