import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2, MapPin, Calendar, DollarSign, Image as ImageIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useEditCourts } from "../../hook/courts/use-edit-courts";
import type { EditCourtDialogProps } from "../../types/courts";

export const EditCourtDialog = ({
  open,
  onOpenChange,
  court,
  refreshCourts,
}: EditCourtDialogProps) => {
  const { handleSubmit, setImagen, toggleDia, diasSemana, isLoading, setFormData, formData } =
    useEditCourts({ court, onOpenChange, open, refreshCourts });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-xl border border-green-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-900">
            Editar Cancha
          </DialogTitle>
        </DialogHeader>

        {court && (
          <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
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
                      value={formData.nombreCancha}
                      onChange={(e) =>
                        setFormData({ ...formData, nombreCancha: e.target.value })
                      }
                      placeholder="Cancha Sintética Los Pinos"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono *</Label>
                    <Input
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      placeholder="6045559999"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Dirección *</Label>
                    <Input
                      value={formData.direccion}
                      onChange={(e) =>
                        setFormData({ ...formData, direccion: e.target.value })
                      }
                      placeholder="Cra 45 #23-11"
                      required
                      disabled={isLoading}
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
                    <Label>Hora Inicio *</Label>
                    <Input
                      type="time"
                      value={formData.horarioInicio}
                      onChange={(e) =>
                        setFormData({ ...formData, horarioInicio: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hora Fin *</Label>
                    <Input
                      type="time"
                      value={formData.horarioFin}
                      onChange={(e) =>
                        setFormData({ ...formData, horarioFin: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Días Disponibles *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {diasSemana.map((dia) => (
                      <label
                        key={dia}
                        className="flex items-center gap-2 text-green-800"
                      >
                        <input
                          type="checkbox"
                          checked={formData.diasDisponibles.includes(dia)}
                          onChange={() => toggleDia(dia)}
                          disabled={isLoading}
                        />
                        <span>{dia}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">
                    Información Adicional
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Valor por hora *</Label>
                    <Input
                      type="number"
                      value={formData.valorHora}
                      onChange={(e) =>
                        setFormData({ ...formData, valorHora: e.target.value })
                      }
                      placeholder="50000"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacidad *</Label>
                    <Input
                      type="number"
                      value={formData.capacidad}
                      onChange={(e) =>
                        setFormData({ ...formData, capacidad: e.target.value })
                      }
                      placeholder="10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Responsable *</Label>
                    <Input
                      value={formData.responsable}
                      onChange={(e) =>
                        setFormData({ ...formData, responsable: e.target.value })
                      }
                      placeholder="Juan Pérez"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Detalles</Label>
                    <Input
                      value={formData.detalles}
                      onChange={(e) =>
                        setFormData({ ...formData, detalles: e.target.value })
                      }
                      placeholder="Cancha sintética 7x7"
                      disabled={isLoading}
                    />
                  </div>
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
                  {court.imagen && (
                    <img
                      src={`http://localhost:4000/api/uploads/${court.imagen}`}
                      alt={court.nombreCancha}
                      className="w-full h-48 object-cover rounded-lg border border-green-100"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files?.[0] || null)}
                    disabled={isLoading}
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
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
              </div>
            </form>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
