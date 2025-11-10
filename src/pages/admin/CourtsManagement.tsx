import { useState } from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { CourtsTable } from "../../components/admin/CourtsTable";
import { CreateCourtDialog } from "../../components/admin/CreateCourtDialog";

export default function CourtsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-green-900">Gestionar Canchas</h1>
          <Button onClick={() => setIsDialogOpen(true)}
            className="mt-1 bg-gradient-to-r from-green-500 to-blue-400 text-white hover:from-green-600 hover:to-blue-500 rounded-lg shadow-md transition-all flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Nueva Cancha
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4">
          <CourtsTable />
        </div>
        <CreateCourtDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </AdminLayout>
  );
}
