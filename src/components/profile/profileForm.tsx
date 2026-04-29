import { useProfile } from "@/modules";
import { Loader2, User } from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
import type { ProfileFormProps } from "@/interfaces";

export const ProfileForm = ({ userId }: ProfileFormProps) => {
  const {
    profile,
    setProfile,
    loading,
    editing,
    setEditing,
    handleChange,
    handleCancel,
    handleSubmit,
  } = useProfile(userId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg shadow-md">
        <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
      </div>
    );
  }

  const validateFields = () => {
    const missing: string[] = [];
    if (profile.tipoDocumento === "NIT") {
      if (!profile.razonSocial || !String(profile.razonSocial).trim()) missing.push("Razón Social");
      if (!profile.numeroDocumento || !String(profile.numeroDocumento).trim()) missing.push("NIT");
      if (!profile.celular || !String(profile.celular).trim()) missing.push("Teléfono");
      if (!profile.direccion || !String(profile.direccion).trim()) missing.push("Dirección");
    } else {
      if (!profile.primerNombre || !String(profile.primerNombre).trim()) missing.push("Primer Nombre");
      if (!profile.primerApellido || !String(profile.primerApellido).trim()) missing.push("Primer Apellido");
      if (!profile.numeroDocumento || !String(profile.numeroDocumento).trim()) missing.push("Número de Documento");
      if (!profile.celular || !String(profile.celular).trim()) missing.push("Teléfono");
      if (!profile.direccion || !String(profile.direccion).trim()) missing.push("Dirección");
    }

    if (missing.length) {
      alert(`Por favor complete los siguientes campos: ${missing.join(", ")}`);
      return false;
    }
    return true;
  };
  
  const handleLocalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;
    handleSubmit(e);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <User className="h-6 w-6 text-green-600" /> Mi Perfil</CardTitle>
        <CardDescription className="text-gray-600">
          Visualiza o edita tu información personal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLocalSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-gray-800 font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.correo}
                disabled
                className="bg-gray-100 text-gray-900 border-gray-200"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="document_type" className="text-gray-800 font-medium">
                Tipo de Documento
              </Label>
              <Select
                required
                value={profile.tipoDocumento}
                onValueChange={(value) => setProfile({ ...profile, tipoDocumento: value })}
                disabled={!editing}
              >
                <SelectTrigger className="bg-gray-100 border-gray-200 text-gray-900">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-md">
                  <SelectItem value="CC">Cédula</SelectItem>
                  <SelectItem value="NIT">NIT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(() => {
              const ccFields = [
                { id: "numeroDocumento", label: "Número de Documento", value: profile.numeroDocumento, required: true },
                { id: "primerNombre", label: "Primer Nombre", value: profile.primerNombre, required: true },
                { id: "segundoNombre", label: "Segundo Nombre", value: profile.segundoNombre },
                { id: "primerApellido", label: "Primer Apellido", value: profile.primerApellido, required: true },
                { id: "segundoApellido", label: "Segundo Apellido", value: profile.segundoApellido },
                { id: "celular", label: "Teléfono", value: profile.celular, required: true },
                { id: "direccion", label: "Dirección", value: profile.direccion, full: true, required: true },
              ];
              const nitFields = [
                { id: "razonSocial", label: "Razón Social", value: profile.razonSocial, required: true },
                { id: "numeroDocumento", label: "NIT", value: profile.numeroDocumento, required: true },
                { id: "celular", label: "Teléfono", value: profile.celular, required: true },
                { id: "direccion", label: "Dirección", value: profile.direccion, full: true, required: true },
              ];

              const fields = profile.tipoDocumento === "NIT" ? nitFields : ccFields;

              return fields.map((field) => (
                <div key={field.id} className={`space-y-1 ${field.full ? "md:col-span-2" : ""}`}>
                  <Label htmlFor={field.id} className="text-gray-800 font-medium">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    name={field.id}
                    value={field.value}
                    onChange={handleChange}
                    disabled={!editing}
                    required={field.required}
                    className="bg-gray-100 text-gray-900 border-gray-200 focus:ring-2 focus:ring-green-300"
                  />
                </div>
              ));
            })()}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            {!editing ? (
              <Button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                onClick={() => setEditing(true)}
              >
                Editar
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white shadow-md flex items-center"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
