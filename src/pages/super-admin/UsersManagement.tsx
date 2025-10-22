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
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestionar Usuarios</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Nuevo Usuario
          </Button>
        </div>
        
        <UsersTable />
        <CreateUserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </SuperAdminLayout>
  );
}
