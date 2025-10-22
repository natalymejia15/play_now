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
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestionar Canchas</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Nueva Cancha
          </Button>
        </div>
        
        <CourtsTable />
        <CreateCourtDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </AdminLayout>
  );
}
