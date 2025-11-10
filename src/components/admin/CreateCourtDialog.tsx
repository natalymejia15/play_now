import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2, MapPin, Calendar, DollarSign, User, Image as ImageIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useCreateCourt } from "../../hook/courts/use-create-court";
import { toast } from "../../hook/use-toast";

interface CreateCourtDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCourtDialog = ({ open, onOpenChange }: CreateCourtDialogProps) => {
  const [nombreCancha, setNombreCancha] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFin, setHorarioFin] = useState("");
  const [diasDisponibles, setDiasDisponibles] = useState<string[]>([]);
  const [valorHora, setValorHora] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [responsable, setResponsable] = useState("");
  const [detalles, setDetalles] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);

  const { createCourt, isLoading } = useCreateCourt();

  const diasSemana = [
    "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
  ];

  const toggleDia = (dia: string) => {
    setDiasDisponibles((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  const resetForm = () => {
    setNombreCancha("");
    setHorarioInicio("");
    setHorarioFin("");
    setDiasDisponibles([]);
    setValorHora("");
    setTelefono("");
    setDireccion("");
    setResponsable("");
    setDetalles("");
    setCapacidad("");
    setImagen(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.mallId) {
      toast({
        title: "Error",
        description: "No se encontró el centro comercial asociado al usuario.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombreCancha", nombreCancha);
    formData.append("horarioInicio", horarioInicio);
    formData.append("horarioFin", horarioFin);
    formData.append("diasDisponibles", diasDisponibles.join(","));
    formData.append("valorHora", valorHora);
    formData.append("telefono", telefono);
    formData.append("direccion", direccion);
    formData.append("responsable", responsable);
    formData.append("detalles", detalles);
    formData.append("capacidad", capacidad);
    formData.append("mallId", user.mallId);
    if (imagen) formData.append("imagen", imagen);

    try {
      await createCourt(formData);
      resetForm();
      onOpenChange(false);
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      console.error("Error creando cancha:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-xl border border-green-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-900">
            Registrar Nueva Cancha
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4 bg-transparent">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Información general */}
            <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">
                  Información General
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre de la Cancha *</Label>
                  <Input
                    value={nombreCancha}
                    onChange={(e) => setNombreCancha(e.target.value)}
                    placeholder="Cancha Sintética Los Pinos"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono *</Label>
                  <Input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="6045559999"
                    maxLength={10}
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Dirección *</Label>
                  <Input
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Cra 25 #15-40"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="space-y-4 p-6 rounded-xl border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-green-700" />
                <h3 className="text-lg font-semibold text-green-800">
                  Horarios y Días Disponibles
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hora de Inicio *</Label>
                  <Input
                    type="time"
                    value={horarioInicio}
                    onChange={(e) => setHorarioInicio(e.target.value)}
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hora de Fin *</Label>
                  <Input
                    type="time"
                    value={horarioFin}
                    onChange={(e) => setHorarioFin(e.target.value)}
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Días Disponibles *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {diasSemana.map((dia) => (
                    <label key={dia} className="flex items-center gap-2 text-green-800">
                      <input
                        type="checkbox"
                        checked={diasDisponibles.includes(dia)}
                        onChange={() => toggleDia(dia)}
                        disabled={isLoading}
                      />
                      <span>{dia}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Detalles adicionales */}
            <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">
                  Detalles y Costos
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor por Hora *</Label>
                  <Input
                    type="number"
                    value={valorHora}
                    onChange={(e) => setValorHora(e.target.value)}
                    placeholder="50000"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Capacidad *</Label>
                  <Input
                    type="number"
                    value={capacidad}
                    onChange={(e) => setCapacidad(e.target.value)}
                    placeholder="10"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Responsable *</Label>
                <Input
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                  placeholder="Juan Pérez"
                  required
                  disabled={isLoading}
                  className="rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-blue-200"
                />
              </div>
              <div className="space-y-2">
                <Label>Detalles Adicionales</Label>
                <Input
                  value={detalles}
                  onChange={(e) => setDetalles(e.target.value)}
                  placeholder="Cancha sintética 7x7 con luces"
                  disabled={isLoading}
                  className="rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Imagen */}
            <div className="space-y-4 p-6 rounded-xl border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-green-700" />
                <h3 className="text-lg font-semibold text-green-800">
                  Imagen de la Cancha
                </h3>
              </div>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagen(e.target.files?.[0] || null)}
                  disabled={isLoading}
                  className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg bg-green-200 text-green-900 hover:bg-green-300 transition-all"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Cancha"
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
