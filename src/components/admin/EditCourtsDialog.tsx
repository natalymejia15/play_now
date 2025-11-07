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
import { useEditCourts } from "../../hook/courts/use-edit-courts";
import type { EditCourtDialogProps } from "../../types/courts";

export const EditCourtDialog = ({
  open,
  onOpenChange,
  court,
  refreshCourts,
}: EditCourtDialogProps) => {
  const { handleSubmit, setImagen, toggleDia, diasSemana, isLoading, setFormData, formData } = useEditCourts({ court, onOpenChange, open, refreshCourts })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Cancha</DialogTitle>
        </DialogHeader>

        {court && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={formData.nombreCancha}
                onChange={(e) =>
                  setFormData({ ...formData, nombreCancha: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Hora inicio</Label>
                <Input
                  type="time"
                  value={formData.horarioInicio}
                  onChange={(e) =>
                    setFormData({ ...formData, horarioInicio: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Hora fin</Label>
                <Input
                  type="time"
                  value={formData.horarioFin}
                  onChange={(e) =>
                    setFormData({ ...formData, horarioFin: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Días disponibles</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {diasSemana.map((dia) => (
                  <label key={dia} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.diasDisponibles.includes(dia)}
                      onChange={() => toggleDia(dia)}
                    />
                    <span>{dia}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valor por hora</Label>
                <Input
                  type="number"
                  value={formData.valorHora}
                  onChange={(e) =>
                    setFormData({ ...formData, valorHora: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Capacidad</Label>
                <Input
                  type="number"
                  value={formData.capacidad}
                  onChange={(e) =>
                    setFormData({ ...formData, capacidad: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Teléfono</Label>
              <Input
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Dirección</Label>
              <Input
                value={formData.direccion}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Responsable</Label>
              <Input
                value={formData.responsable}
                onChange={(e) =>
                  setFormData({ ...formData, responsable: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Detalles</Label>
              <Input
                value={formData.detalles}
                onChange={(e) =>
                  setFormData({ ...formData, detalles: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Imagen actual</Label>
              {court.imagen && (
                <img
                  src={`http://localhost:4000/uploads/${court.imagen}`}
                  alt={court.nombreCancha}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImagen(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
