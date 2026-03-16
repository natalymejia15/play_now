import { useDataTable, useTableActions } from "@/lib";
import { useDeports, useDeportsTable } from "../hooks"
import { COLUMNS_DEPORTS, PRIMARY_DEPORTS } from "@/constants";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogHeader,
    DataTable
} from "@/components";
import { EditDeportsDialog } from "./EditDeportsDialog";


export const DeportsTablet = () => {
    const { deports, deleteDeport } = useDeports();

    const {
        deportToEdit,
        isEditDialogOpen,
        setIsEditDialogOpen,
        deportToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleEdit,
        handleDeleteClick,
        handleConfirmDelete,
        handleViewDeport,
    } = useDeportsTable(deports, deleteDeport);
    
    const { search, setSearch, visibleColumns, setVisibleColumns, filtered } =
        useDataTable(deports, COLUMNS_DEPORTS, ["nombre", "activo"]);

    const actions = useTableActions({
        onView: (d) => handleViewDeport(d.id),
        onEdit: handleEdit,
        onDelete: handleDeleteClick,
    });

    return (
        <>
            <DataTable
                data={filtered}
                columns={COLUMNS_DEPORTS}
                primaryColumn={PRIMARY_DEPORTS}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
                search={search}
                setSearch={setSearch}
                actions={actions}
                keyExtractor={(d) => d.id}
                emptyMessage="No hay deportes registrados"
                searchPlaceholder="Buscar deportes..."
            />

            <EditDeportsDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                deport={deportToEdit}
            />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="border border-green-500 bg-green-50 text-green-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-green-700">
                            ¿Eliminar este deporte?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-green-800">
                            Esta acción eliminará permanentemente{" "}
                            <span className="font-semibold">{deportToDelete?.nombre}</span>.
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
}