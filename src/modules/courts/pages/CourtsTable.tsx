import { useDataTable, useTableActions } from "@/lib";
import { COLUMNS_COURTS, PRIMARY_COURTS, } from "@/constants";
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
import { useCourts, useCourtsTable } from "../hooks";


export const CourtsTablet = () => {
    const { courts, deleteCourts } = useCourts();

    const {
        courtsToEdit,
        isEditDialogOpen,
        setIsEditDialogOpen,
        courtsToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleEdit,
        handleDeleteClick,
        handleConfirmDelete,
        handleViewCourts,
        court
    } = useCourtsTable(courts);

    const { search, setSearch, visibleColumns, setVisibleColumns, filtered } =
        useDataTable(courts, COLUMNS_COURTS, []);

    const actions = useTableActions({
        onView: (d) => handleViewCourts(d.id),
        onEdit: handleEdit,
        onDelete: handleDeleteClick,
    });

    return (
        <>
            <DataTable
                data={filtered}
                columns={COLUMNS_COURTS}
                primaryColumn={PRIMARY_COURTS}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
                search={search}
                setSearch={setSearch}
                actions={actions}
                keyExtractor={(d) => d.id}
                emptyMessage="No hay canchas registrados"
                searchPlaceholder="Buscar canchas..."
            />


            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="border border-green-500 bg-green-50 text-green-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-green-700">
                            ¿Eliminar esta cancha?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-green-800">
                            Esta acción eliminará permanentemente{" "}
                            <span className="font-semibold">{courtsToDelete?.nombreCancha}</span>.
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