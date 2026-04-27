import { useCreateReservation } from "../hooks";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from "@/components";

export interface Court {
  id: number;
  nombreCancha: string;
  valorHora: number;
  name?: string;
  price?: number;
} 
export interface BookingFormProps {
  selectedCourt: Court;
  onClose: () => void;
}

export function ReservationsForm({
  selectedCourt,
  onClose,
}: BookingFormProps) {
  const {
    handleSubmit,
    handleChange,
    duration,
    handleDurationChange,
    total,
    pricePerHour,
    isLoading,
  } = useCreateReservation({
    onOpenChange: onClose,
    selectedCourt,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Card className="max-w-md w-full mx-4 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle>
            Reservar {selectedCourt.nombreCancha}
          </CardTitle>
          <CardDescription>
            Completa el formulario para realizar tu reserva.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label>Fecha</Label>
              <Input
                type="date"
                name ="fechaReserva"
                required
                onChange={(e) =>
                  handleChange("fechaReserva", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Hora</Label>
              <Input
                type="time"
                required
                name="horaReserva"
                onChange={(e) =>
                  handleChange("horaReserva", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Duración (horas)</Label>
              <Input
                type="number"
                min="1"
                max="4"
                name="cantidadHoras"
                value={duration}
                onChange={(e) =>
                  handleDurationChange(Number(e.target.value))
                }
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${total.toLocaleString("es-CO")}</span>
              </div>
              <small>
                ${pricePerHour.toLocaleString("es-CO")} / hora
              </small>
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={onClose}>
                Cancelar
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Reservando..." : "Confirmar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}