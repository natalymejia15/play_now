import { useAdminHistorialReservations } from "../hooks";
import { useDataTable } from "@/lib";
import { COLUMNS_ADMIN_RESERVATIONS, PRYMARY_ADMIN_RESERVATIONS } from "@/constants";
import { DataTable } from "@/components";

export default function AdminHistoryReservations() {
    const { reservations } = useAdminHistorialReservations();
    const { search, setSearch, visibleColumns, setVisibleColumns, filtered } =
        useDataTable(reservations, COLUMNS_ADMIN_RESERVATIONS, ["cliente", "fechaReserva", "valorTotal"], PRYMARY_ADMIN_RESERVATIONS.key);

    return (
        <>
            <DataTable
                data={filtered}
                columns={COLUMNS_ADMIN_RESERVATIONS}
                primaryColumn={PRYMARY_ADMIN_RESERVATIONS}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
                search={search}
                setSearch={setSearch}
                emptyMessage="No hay reservas registradas"
                searchPlaceholder="Buscar reserva..."
            />

        </>
    );
}
