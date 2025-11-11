import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useReservations } from "../../hook/reservation/use-list-reservations";

export default function HistorialReserva() {
  const { reservations, loading } = useReservations();

  const safeValue = (value: any, placeholder = "—") =>
    value !== null && value !== undefined && value !== "" ? value : placeholder;

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Centro Comercial</TableHead>
            <TableHead>Cancha</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Fecha Reserva</TableHead>
            <TableHead>Hora Reserva</TableHead>
            <TableHead>Valor Total</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Cargando reservas...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : reservations.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground py-6"
              >
                No hay reservas registradas
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reserva) => (
              <TableRow key={reserva.id}>
                <TableCell>
                  {safeValue(reserva?.cancha?.mall?.nombreCentro)}
                </TableCell>
                <TableCell>
                  {safeValue(reserva?.cancha?.nombreCancha)}
                </TableCell>
                <TableCell>
                  {safeValue(reserva?.cancha?.direccion)}
                </TableCell>
                <TableCell>
                  {safeValue(reserva?.cancha?.mall?.ciudad)}
                </TableCell>
                <TableCell>
                  {safeValue(reserva?.fechaReserva)}
                </TableCell>
                <TableCell>
                  {safeValue(reserva?.horaReserva)}
                </TableCell>
                <TableCell>
                  {reserva?.valorTotal
                    ? `$${parseInt(reserva.valorTotal).toLocaleString("es-CO")}`
                    : "—"}
                </TableCell>
                <TableCell>
                  {safeValue(reserva?.estado)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
