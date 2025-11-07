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
import { Loader2 } from "lucide-react";
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
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
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
      resetForm()
      onOpenChange(false);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Error creando cancha:", error);
    }


  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Cancha</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombreCancha">Nombre de la cancha</Label>
            <Input
              id="nombreCancha"
              value={nombreCancha}
              onChange={(e) => setNombreCancha(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horarioInicio">Hora de inicio</Label>
              <Input
                type="time"
                id="horarioInicio"
                value={horarioInicio}
                onChange={(e) => setHorarioInicio(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="horarioFin">Hora de fin</Label>
              <Input
                type="time"
                id="horarioFin"
                value={horarioFin}
                onChange={(e) => setHorarioFin(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Días disponibles</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {diasSemana.map((dia) => (
                <label key={dia} className="flex items-center gap-2">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorHora">Valor por hora</Label>
              <Input
                type="number"
                id="valorHora"
                value={valorHora}
                onChange={(e) => setValorHora(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacidad">Capacidad</Label>
              <Input
                type="number"
                id="capacidad"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              maxLength={10}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsable">Responsable</Label>
            <Input
              id="responsable"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="detalles">Detalles adicionales</Label>
            <Input
              id="detalles"
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imagen">Imagen</Label>
            <Input
              type="file"
              id="imagen"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files?.[0] || null)}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
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
      </DialogContent>
    </Dialog>
  );
};
