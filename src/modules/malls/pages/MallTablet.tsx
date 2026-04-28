import { useMallsTable } from "../hooks";
import { useDataTable, useTableActions } from "@/lib";
import { DataTable, StatusSwitch } from "@/components";
import { COLUMNS_MALLS, PRIMARY_MALLS } from "@/constants";
import { EditMallDialog } from "./EditMallDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components";

export const MallsTable = () => {
  const {
    malls,
    handleEdit,
    handleDeleteClick,
    handleViewMall,
    handleConfirmDelete,
    mallToEdit,
    mallToDelete,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    updateStatusMalls
  } = useMallsTable();

  const { search, setSearch, visibleColumns, setVisibleColumns, filtered } =
    useDataTable(malls, COLUMNS_MALLS, ["nombreCentro", "ciudad", "direccion"], PRIMARY_MALLS.key);

  const columns = COLUMNS_MALLS.map((col) => {
    if (col.key === "activo") {
      return {
        ...col,
        render: (d: any) => (
          <StatusSwitch
            checked={d.activo}
            entityName={d.nombre}  
            onActivate={() => updateStatusMalls(d.id, true)}
            onDeactivate={() => updateStatusMalls(d.id, false)}
          />
        ),
      };
    }
    return col;
  });
  const actions = useTableActions({
    onView: (m) => handleViewMall(m.id),
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <>
      <DataTable
        data={filtered}
        columns={columns}
        primaryColumn={PRIMARY_MALLS}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        search={search}
        setSearch={setSearch}
        actions={actions}
        keyExtractor={(m) => m.id}
        emptyMessage="No hay centros comerciales registrados"
        searchPlaceholder="Buscar centro comercial..."
      />

      <EditMallDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mall={mallToEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="border border-green-500 bg-green-50 text-green-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-700">
              ¿Eliminar este centro comercial?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-green-800">
              Esta acción eliminará permanentemente{" "}
              <span className="font-semibold">{mallToDelete?.nombreCentro}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};