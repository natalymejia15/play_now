import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { EditMallDialog } from "./EditMallDialog";
import type { IMall } from "../../types/mall";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useMalls } from "../../hook/malls/use-mall";

export const MallsTable = () => {
  const { malls, fetching, deleteMall } = useMalls();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [mallToEdit, setMallToEdit] = useState<IMall | null>(null);
  const [mallToDelete, setMallToDelete] = useState<IMall | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (mall: IMall) => {
    setMallToEdit(mall);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (mall: IMall) => {
    setMallToDelete(mall);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (mallToDelete?.id) {
      await deleteMall(mallToDelete.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleViewMall = (mallId?: number) => {
    if (!mallId) return;
    navigate(`/super-admin/mall/${mallId}`);
  };

  if (fetching) return <div>Cargando centros comerciales...</div>;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Centro Comercial</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Administrador</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {malls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                No hay centros comerciales registrados
              </TableCell>
            </TableRow>
          ) : (
            malls.map((mall) => (
              <TableRow key={mall.id}>
                <TableCell>{mall.nombreCentro}</TableCell>
                <TableCell>{mall.direccion}</TableCell>
                <TableCell>{mall.telefono}</TableCell>
                <TableCell>{mall.ciudad}</TableCell>
                <TableCell>
                  {mall.administrador
                    ? `${mall.administrador.primerNombre} ${mall.administrador.primerApellido}`
                    : "Sin asignar"}
                </TableCell>
                <TableCell>{mall.administrador?.correo || "-"}</TableCell>
                <TableCell>{mall.administrador?.celular || "-"}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewMall(mall.id)} title="Ver centro comercial">
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => handleEdit(mall)} title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(mall)} title="Eliminar">
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
        mall={mallToEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="border border-green-500 bg-green-50 text-green-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-700"> ¿Eliminar este centro comercial?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-green-800">
              Esta acción eliminará permanentemente{" "}
              <span className="font-semibold">{mallToDelete?.nombreCentro}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleConfirmDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};
