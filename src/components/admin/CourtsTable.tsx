import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Eye, Loader2, Pencil, Trash } from "lucide-react";
import { useCourt } from "../../hook/courts/use-courts";
import type { Court } from "../../types/courts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";
import { EditCourtDialog } from "./EditCourtsDialog";
import { useNavigate } from "react-router-dom";

export const CourtsTable = () => {
  const { courts, fetchCourts, loading, deleteCourts } = useCourt();
  const [courtsToDelete, setCourtsToDelete] = useState<Court | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Gestión de Canchas - Play Now";
    fetchCourts();
  }, []);

  const handleEditClick = (court: Court) => {
    setSelectedCourt(court);
    setIsEditDialogOpen(true);
  };
  const handleDeleteClick = (court: Court) => {
    setCourtsToDelete(court);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (courtsToDelete?.id) {
      await deleteCourts(courtsToDelete.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleViewCourts = (courtsId?: number) => {
    if (!courtsId) return;
    navigate(`/admin/courts/${courtsId}`);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Valor Hora</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Hora inicio</TableHead>
            <TableHead>Hora fin</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Cargando canchas...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : courts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-6"
              >
                No hay canchas registradas
              </TableCell>
            </TableRow>
          ) : (
            courts.map((court) => (
              <TableRow key={court.id}>
                <TableCell className="font-medium">{court.nombreCancha}</TableCell>
                <TableCell>{court.direccion}</TableCell>
                <TableCell>{court.responsable}</TableCell>
                <TableCell>${court.valorHora.toLocaleString()}</TableCell>
                <TableCell>{court.capacidad}</TableCell>
                <TableCell>{court.horarioInicio} </TableCell>
                <TableCell>{court.horarioFin} </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewCourts(court.id)} title="Ver centro comercial">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditClick(court)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeleteClick(court)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <EditCourtDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        court={selectedCourt}
        refreshCourts={fetchCourts}
      />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este centro comercial?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente{" "}
              <span className="font-semibold">{courtsToDelete?.nombreCancha}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
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
