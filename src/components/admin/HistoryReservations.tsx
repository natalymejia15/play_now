import { Loader2 } from "lucide-react";
import { useAllReservations } from "../../hook/reservation/use-all-reservations";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";

export default function HistorialGeneralReservas() {
    const { reservations, loading } = useAllReservations();

    const safeValue = (value: any, placeholder = "—") =>
        value !== null && value !== undefined && value !== "" ? value : placeholder;

    return (
        <div className="border rounded-lg bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Correo</TableHead>
                        <TableHead>Celular</TableHead>
                        <TableHead>Cancha</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead>Fecha Reserva</TableHead>
                        <TableHead>Hora Reserva</TableHead>
                        <TableHead>Horas</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={11} className="text-center text-muted-foreground">
                                <div className="flex items-center justify-center space-x-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Cargando reservas...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : reservations.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={11}
                                className="text-center text-muted-foreground py-6"
                            >
                                No hay reservas registradas
                            </TableCell>
                        </TableRow>
                    ) : (
                        reservations.map((reserva) => (
                            <TableRow key={reserva.id}>
                                <TableCell>
                                    {safeValue(reserva?.cliente?.primerNombre)}{" "}
                                    {safeValue(reserva?.cliente?.primerApellido)}
                                </TableCell>
                                <TableCell>{safeValue(reserva?.cliente?.numeroDocumento)}</TableCell>
                                <TableCell>{safeValue(reserva?.cliente?.correo)}</TableCell>
                                <TableCell>{safeValue(reserva?.cliente?.celular)}</TableCell>
                                <TableCell>{safeValue(reserva?.cancha?.nombreCancha)}</TableCell>
                                <TableCell>{safeValue(reserva?.cancha?.direccion)}</TableCell>
                                <TableCell>{safeValue(reserva?.fechaReserva)}</TableCell>
                                <TableCell>{safeValue(reserva?.horaReserva)}</TableCell>
                                <TableCell>{safeValue(reserva?.cantidadHoras)}</TableCell>
                                <TableCell>
                                    {reserva?.valorTotal
                                        ? `$${parseInt(reserva.valorTotal).toLocaleString("es-CO")}`
                                        : "—"}
                                </TableCell>
                                <TableCell>{safeValue(reserva?.estado)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
