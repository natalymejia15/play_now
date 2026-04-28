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
    DataTable,
    StatusSwitch
} from "@/components";
import { useCourts, useCourtsTable } from "../hooks";
import { EditCourtsDialog } from "./EditCourtsDialog";


export const CourtsTablet = () => {
    const { courts, updateStatusCourts } = useCourts();

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
    } = useCourtsTable(courts);

    const { search, setSearch, visibleColumns, setVisibleColumns, filtered } =
        useDataTable(courts, COLUMNS_COURTS, [], PRIMARY_COURTS.key);

    const columns = COLUMNS_COURTS.map((col) => {
        if (col.key === "activo") {
            return {
                ...col,
                render: (d: any) => (
                    <StatusSwitch
                        checked={d.activo}
                        entityName={d.nombre}
                        onActivate={() => updateStatusCourts(d.id, true)}
                        onDeactivate={() => updateStatusCourts(d.id, false)}
                    />
                ),
            };
        }
        return col;
    });

    const actions = useTableActions({
        onView: (d) => handleViewCourts(d.id),
        onEdit: handleEdit,
        onDelete: handleDeleteClick,
    });

    return (
        <>
            <DataTable
                data={filtered}
                columns={columns}
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

            <EditCourtsDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                court={courtsToEdit}
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