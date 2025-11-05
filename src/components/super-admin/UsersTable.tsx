import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCreateMall } from "../../hook/malls/use-mall";
import { Button } from "../ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { EditMallDialog } from "./EditMallDialog";
import type { User } from "../../types/user";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hook/use-toast";


export const UsersTable = () => {
  const { malls, fetchMalls, fetching } = useCreateMall();
  const [localMalls, setLocalMalls] = useState(malls);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleViewMall = (mallId?: string) => {
    if (mallId) {
      navigate(`/super-admin/mall/${mallId}`);
    } else {
      toast({
        title: "Sin centro comercial",
        description: "Este usuario no tiene un centro comercial asignado",
        variant: "destructive",
      });
    }
  };

   const handleEdit = (userId: string) => {
    setSelectedUserId(userId);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };
  const fetchUsers = async () => {

  };
  useEffect(() => {
    setLocalMalls(malls);
  }, [malls]);

  useEffect(() => {
    fetchMalls();
  }, []);


  if (fetching) return <div>Cargando centros comerciales...</div>;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Centro</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {malls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No hay centros comerciales registrados
              </TableCell>
            </TableRow>
          ) : (
            malls.map((mall) => (
              <TableRow key={mall.nombreCentro}>
                <TableCell>{mall.nombreCentro}</TableCell>
                <TableCell>{mall.direccion}</TableCell>
                <TableCell>{mall.telefono}</TableCell>
                <TableCell>{mall.ciudad}</TableCell>
                <TableCell>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewMall}
                      title="Ver centro comercial"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit}
                      title="Editar usuario"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick}
                      title="Eliminar usuario"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <EditMallDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        userId={selectedUserId}
        onSuccess={fetchUsers}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de eliminar este usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el usuario{" "}
              <span className="font-semibold">{userToDelete?.email}</span> y su rol de administrador.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};