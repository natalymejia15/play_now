import { useCreateReservation } from "../hooks";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components";
import type { BookingFormProps } from "../interfaces";

export const ReservationsForm = ({
  selectedCourt,
  onClose,
}: BookingFormProps) => {
  const {
    handleSubmit,
    handleChange,
    duration,
    handleDurationChange,
    total,
    pricePerHour,
    isLoading,
    step,
    handleNextStep,
    handlePrevStep,
    paymentUserData,
    handlePaymentUserChange,
  } = useCreateReservation({
    onOpenChange: onClose,
    selectedCourt,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Card className="max-w-md w-full mx-4 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reservar {selectedCourt.nombreCancha}</CardTitle>
            {/* Indicador de pasos */}
            <div className="flex items-center gap-1.5">
              <div
                className={`h-2 w-6 rounded-full transition-all ${
                  step === 1 ? "bg-green-500" : "bg-gray-200"
                }`}
              />
              <div
                className={`h-2 w-6 rounded-full transition-all ${
                  step === 2 ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            </div>
          </div>
          <CardDescription>
            {step === 1
              ? "Completa los detalles de tu reserva."
              : "Datos para el pago con PSE."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* ── PASO 1: Datos de la reserva ── */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <Label>Fecha</Label>
                <Input
                  type="date"
                  name="fechaReserva"
                  required
                  onChange={(e) => handleChange("fechaReserva", e.target.value)}
                />
              </div>
              <div>
                <Label>Hora</Label>
                <Input
                  type="time"
                  name="horaReserva"
                  required
                  onChange={(e) => handleChange("horaReserva", e.target.value)}
                />
              </div>
              <div>
                <Label>Duración (horas)</Label>
                <Input
                  type="number"
                  required
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
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${total.toLocaleString("es-CO")}</span>
                </div>
                <small className="text-gray-500">
                  ${pricePerHour.toLocaleString("es-CO")} / hora
                </small>
              </div>

              <div className="flex gap-3">
                <Button type="button" onClick={onClose} variant="outline">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Continuar →
                </Button>
              </div>
            </form>
          )}

          {/* ── PASO 2: Datos de pago ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Nombre completo</Label>
                <Input
                  type="text"
                  required
                  placeholder="Ej: Alexander Montaño"
                  value={paymentUserData.full_name}
                  onChange={(e) =>
                    handlePaymentUserChange("full_name", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Correo electrónico</Label>
                <Input
                  type="email"
                  required
                  placeholder="Ej: correo@email.com"
                  value={paymentUserData.customerEmail}
                  onChange={(e) =>
                    handlePaymentUserChange("customerEmail", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Número de cédula</Label>
                <Input
                  type="text"
                  required
                  placeholder="Ej: 1152205324"
                  value={paymentUserData.userLegalId}
                  onChange={(e) =>
                    handlePaymentUserChange("userLegalId", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  type="tel"
                  required
                  placeholder="Ej: 3045491946"
                  value={paymentUserData.phone_number}
                  onChange={(e) =>
                    handlePaymentUserChange("phone_number", e.target.value)
                  }
                />
              </div>

              {/* Resumen del total */}
              <div className="bg-gray-50 p-3 rounded-xl flex justify-between text-sm font-medium">
                <span>Total a pagar:</span>
                <span className="text-green-600">
                  ${total.toLocaleString("es-CO")}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="outline"
                >
                  ← Volver
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Procesando..." : "Pagar con PSE"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};