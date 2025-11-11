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
import { AdminLayout } from "../layouts/AdminLayout";

export default function HistorialGeneralReservas() {
    const { reservations, loading } = useAllReservations();

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
                                    {reserva.cliente.primerNombre} {reserva.cliente.primerApellido}
                                </TableCell>
                                <TableCell>{reserva.cliente.numeroDocumento}</TableCell>
                                <TableCell>{reserva.cliente.correo}</TableCell>
                                <TableCell>{reserva.cliente.celular}</TableCell>
                                <TableCell>{reserva.cancha.nombreCancha}</TableCell>
                                <TableCell>{reserva.cancha.direccion}</TableCell>
                                <TableCell>{reserva.fechaReserva}</TableCell>
                                <TableCell>{reserva.horaReserva}</TableCell>
                                <TableCell>{reserva.cantidadHoras}</TableCell>
                                <TableCell>${parseInt(reserva.valorTotal).toLocaleString()}</TableCell>
                                <TableCell>{reserva.estado}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
