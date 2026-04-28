import { COLUMNS_CLIENT_RESERVATIONS, PRYMARY_CLIENT_RESERVATIONS } from "@/constants";
import { useClientHistorialReservations } from "../hooks";
import { useDataTable } from "@/lib";
import { ClientLayout, DataTable } from "@/components";


export const ClientHistoryReservations = () => {
  const { reservations } = useClientHistorialReservations();
  const { search, setSearch, visibleColumns, setVisibleColumns, filtered } =
    useDataTable(reservations, COLUMNS_CLIENT_RESERVATIONS, [], PRYMARY_CLIENT_RESERVATIONS.key);
  return (
    <ClientLayout>
      <div className="space-y-2">
        < h1 className="text-3xl font-bold text-green-900">Historico de Reservas</h1>
        <DataTable
          data={filtered}
          columns={COLUMNS_CLIENT_RESERVATIONS}
          primaryColumn={PRYMARY_CLIENT_RESERVATIONS}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          search={search}
          setSearch={setSearch}
          emptyMessage="No hay reservas registradas"
          searchPlaceholder="Buscar reserva..."
        />
      </div>
    </ClientLayout>
  );
}
