import { useState } from "react";
import { SuperAdminLayout } from "../../components/layouts/SuperAdminLayout";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { UsersTable } from "../../components/super-admin/UsersTable";
import { CreateUserDialog } from "../../components/super-admin/CreateUserDialog";

export default function UsersManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-green-900">Gestionar Centros Comerciales</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="mt-1 bg-gradient-to-r from-green-500 to-blue-400 text-white hover:from-green-600 hover:to-blue-500 rounded-lg shadow-md transition-all flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Nuevo Centro Comercial
          </Button>
        </div>
      
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4">
          <UsersTable />
        </div>
        <CreateUserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </SuperAdminLayout>
  );
}
