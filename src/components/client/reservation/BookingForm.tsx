import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useCreateReservation } from "../../../hook/reservation/use-reservation";
import { toast } from "@/lib";

interface BookingFormProps {
  selectedCourt: any;
  onClose: () => void;
}

export function BookingForm({ selectedCourt, onClose }: BookingFormProps) {
  const { createReservation } = useCreateReservation();

  // Estado para duración y total
  const [duration, setDuration] = useState<number>(1);
  const pricePerHour = Number(selectedCourt?.valorHora || selectedCourt?.price || 0);

  const total = duration * pricePerHour;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      courtId: selectedCourt.id,
      fechaReserva: formData.get("date"),
      horaReserva: formData.get("time"),
      cantidadHoras: duration,
    };

    try {
      await createReservation(payload);
      toast({
        title: "Reserva creada",
        description: "Tu reserva fue registrada con éxito.",
      });
      onClose();
    } catch (error) {
      console.error("Error al crear reserva:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in-50">
      <Card className="max-w-md w-full mx-4 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader className="border-b border-gray-100 pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Reservar {selectedCourt?.nombreCancha || selectedCourt?.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Completa el formulario para realizar tu reserva.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleBookingSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" name="date" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input id="time" name="time" type="time" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duración (horas)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                max="4"
                value={duration}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value) && value >= 1 && value <= 4) {
                    setDuration(value);
                  }
                }}
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  Total estimado:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ${total.toLocaleString("es-CO")}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Valor por hora: ${pricePerHour.toLocaleString("es-CO")}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 text-white hover:bg-green-700"
              >
                Confirmar Reserva
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
