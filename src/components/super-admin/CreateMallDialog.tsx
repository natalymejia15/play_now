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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2, Building2, User } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useCreateMall } from "../../hook/malls/use-create-mall";

interface CreateMallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateMallDialog = ({ open, onOpenChange }: CreateMallDialogProps) => {
  const { createMall, isLoading } = useCreateMall();

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
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    document.title = "Gestión de Centros Comerciales- Play now";
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      await createMall(payload);

      setForm({
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
        password: "",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error creando mall:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-green-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-900">Crear Nuevo Centro Comercial</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4 bg-transparent">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Información del Centro Comercial</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreCentro">Nombre del Centro *</Label>
                  <Input
                    id="nombreCentro"
                    value={form.nombreCentro}
                    onChange={e => handleChange("nombreCentro", e.target.value)}
                    placeholder="Centro Comercial El Tesoro"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Select
                    value={form.ciudad}
                    onValueChange={(val) => handleChange("ciudad", val)}
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      id="ciudad"
                      className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200 bg-white"
                    >
                      <SelectValue placeholder="Seleccione una ciudad" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-gray-300 shadow-sm bg-white">
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
                    onChange={e => handleChange("direccionMall", e.target.value)}
                    placeholder="Carrera 25 #1A Sur - 45"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={form.telefono}
                    onChange={e => handleChange("telefono", e.target.value)}
                    placeholder="6045559999"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6 rounded-xl border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-800" />
                <h3 className="text-lg font-semibold text-green-800">Información del Administrador</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                  <Select
                    value={form.tipoDocumento}
                    onValueChange={val => handleChange("tipoDocumento", val)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-blue-200 bg-white">
                      <SelectValue placeholder="Seleccione tipo de documento" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-gray-300 shadow-sm bg-white">
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
                  { id: "correo", label: "Correo Electrónico *", placeholder: "admin@ejemplo.com", type: "email" },
                  { id: "celular", label: "Celular *", placeholder: "3001112233" },
                ].map(field => (
                  <div className="space-y-2" key={field.id}>
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      type={field.type || "text"}
                      value={form[field.id as keyof typeof form]}
                      onChange={e => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.label.includes("*")}
                      disabled={isLoading}
                      className="rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-blue-200"
                    />
                  </div>
                ))}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccionAdmin">Dirección *</Label>
                  <Input
                    id="direccionAdmin"
                    value={form.direccionAdmin}
                    onChange={e => handleChange("direccionAdmin", e.target.value)}
                    placeholder="Calle 12 #34-56"
                    required
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-blue-200"
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
                  "Crear Administrador"
                )}
              </Button>
            </div>

          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
