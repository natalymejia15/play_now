import { useAdminHistorialReservations } from "../hooks";
import { useDataTable } from "@/lib";
import { COLUMNS_ADMIN_RESERVATIONS, PRYMARY_ADMIN_RESERVATIONS } from "@/constants";
import { AdminLayout, DataTable } from "@/components";

export const AdminHistoryReservations = () => {
    const { reservations } = useAdminHistorialReservations();
    const { search, setSearch, visibleColumns, setVisibleColumns, filtered } =
        useDataTable(reservations, COLUMNS_ADMIN_RESERVATIONS, ["cliente", "fechaReserva", "valorTotal"], PRYMARY_ADMIN_RESERVATIONS.key);

    return (
        <AdminLayout>
            <div className="space-y-3">
                < h1 className="text-3xl font-bold text-green-900">Historico de Reservas</h1>
                <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4">
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
                </div>
            </div>
        </AdminLayout>
    );
}
