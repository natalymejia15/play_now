import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2, Building2, User } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "../../hook/use-toast";
import axios from "axios";
import type { IMall } from "../../types/mall";

interface EditMallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mall: IMall | null;
  onSuccess?: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const EditMallDialog = ({ open, onOpenChange, mall, onSuccess }: EditMallDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    nombreCentro: "",
    direccionMall: "",
    telefono: "",
    ciudad: "",
    tipoDocumento: "CC",
    numeroDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    celular: "",
    direccionAdmin: "",
  });

  useEffect(() => {
    if (mall && open) {
      setForm({
        nombreCentro: mall.nombreCentro || "",
        direccionMall: mall.direccion || "",
        telefono: mall.telefono || "",
        ciudad: mall.ciudad || "",
        tipoDocumento: mall.administrador?.tipoDocumento || "CC",
        numeroDocumento: mall.administrador?.numeroDocumento || "",
        primerNombre: mall.administrador?.primerNombre || "",
        segundoNombre: mall.administrador?.segundoNombre || "",
        primerApellido: mall.administrador?.primerApellido || "",
        segundoApellido: mall.administrador?.segundoApellido || "",
        correo: mall.administrador?.correo || "",
        celular: mall.administrador?.celular || "",
        direccionAdmin: mall.administrador?.direccion || "",
      });
    }
  }, [mall, open]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mall?.id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "No se encontró token de autenticación",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        mall: {
          nombreCentro: form.nombreCentro,
          direccion: form.direccionMall,
          telefono: form.telefono,
          ciudad: form.ciudad,
        },
        admin: {
          tipoDocumento: form.tipoDocumento,
          numeroDocumento: form.numeroDocumento,
          primerNombre: form.primerNombre,
          segundoNombre: form.segundoNombre,
          primerApellido: form.primerApellido,
          segundoApellido: form.segundoApellido,
          correo: form.correo,
          celular: form.celular,
          direccion: form.direccionAdmin,
        },
      };

      await axios.put(`${API_URL}/malls/${mall.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Éxito",
        description: "Centro comercial actualizado correctamente",
        variant: "success",
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error actualizando mall:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo actualizar el centro comercial",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-xl border border-green-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-900">
            Editar Centro Comercial
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Centro Comercial */}
            <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">
                  Información del Centro Comercial
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreCentro">Nombre del Centro *</Label>
                  <Input
                    id="nombreCentro"
                    value={form.nombreCentro}
                    onChange={(e) => handleChange("nombreCentro", e.target.value)}
                    placeholder="Centro Comercial El Tesoro"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Select
                    value={form.ciudad}
                    onValueChange={(val) => handleChange("ciudad", val)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medellín">Medellín</SelectItem>
                      <SelectItem value="Envigado">Envigado</SelectItem>
                      <SelectItem value="Sabaneta">Sabaneta</SelectItem>
                      <SelectItem value="Itagüí">Itagüí</SelectItem>
                      <SelectItem value="Bello">Bello</SelectItem>
                      <SelectItem value="La Estrella">La Estrella</SelectItem>
                      <SelectItem value="Copacabana">Copacabana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccionMall">Dirección *</Label>
                  <Input
                    id="direccionMall"
                    value={form.direccionMall}
                    onChange={(e) => handleChange("direccionMall", e.target.value)}
                    placeholder="Carrera 25 #1A Sur - 45"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={form.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    placeholder="6045559999"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Información Administrador */}
            <div className="space-y-4 p-6 rounded-xl border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-800" />
                <h3 className="text-lg font-semibold text-green-800">
                  Información del Administrador
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                  <Select
                    value={form.tipoDocumento}
                    onValueChange={(val) => handleChange("tipoDocumento", val)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="NIT">NIT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {[
                  { id: "numeroDocumento", label: "Número de Documento *", placeholder: "1002003004" },
                  { id: "primerNombre", label: "Primer Nombre *", placeholder: "Laura" },
                  { id: "segundoNombre", label: "Segundo Nombre", placeholder: "Marcela" },
                  { id: "primerApellido", label: "Primer Apellido *", placeholder: "López" },
                  { id: "segundoApellido", label: "Segundo Apellido", placeholder: "Gómez" },
                  { id: "correo", label: "Correo Electrónico *", placeholder: "admin@ejemplo.com" },
                  { id: "celular", label: "Celular *", placeholder: "3001112233" },
                ].map((field) => (
                  <div className="space-y-2" key={field.id}>
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.label.includes("*")}
                      disabled={isLoading}
                    />
                  </div>
                ))}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccionAdmin">Dirección *</Label>
                  <Input
                    id="direccionAdmin"
                    value={form.direccionAdmin}
                    onChange={(e) => handleChange("direccionAdmin", e.target.value)}
                    placeholder="Calle 12 #34-56"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

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
              <Button type="submit" className="rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all" disabled={isLoading}>
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
      </DialogContent>
    </Dialog>
  );
};
