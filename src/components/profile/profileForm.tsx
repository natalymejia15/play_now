import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useProfile } from "../../hook/users/use-profile";

interface ProfileFormProps {
  userId?: number;
}

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
      <div className="flex items-center justify-center min-h-[200px] bg-blue-50 rounded-lg shadow-md">
        <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100 shadow-xl rounded-2xl">
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl text-blue-900 font-semibold">Mi Perfil</CardTitle>
        <CardDescription className="text-blue-700">
          Visualiza o edita tu información personal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Correo Electrónico */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-blue-800 font-medium">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-blue-100 text-blue-900 border-blue-200 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Tipo de Documento */}
            <div className="space-y-1">
              <Label htmlFor="document_type" className="text-blue-800 font-medium">Tipo de Documento</Label>
              <Select
                value={profile.document_type}
                onValueChange={(value) => setProfile({ ...profile, document_type: value as string })}
                disabled={!editing}
              >
                <SelectTrigger
                  id="document_type"
                  className="bg-blue-100 border-blue-200 text-blue-900 focus:ring-2 focus:ring-green-300"
                >
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent className="bg-green-50 text-blue-900 border border-blue-200 shadow-md">
                  <SelectItem value="CC">Cédula</SelectItem>
                  <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                  <SelectItem value="PA">Pasaporte</SelectItem>
                  <SelectItem value="NIT">NIT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {[
              { id: "document_number", label: "Número de Documento", value: profile.document_number },
              { id: "first_name", label: "Primer Nombre", value: profile.first_name },
              { id: "segundo_nombre", label: "Segundo Nombre", value: profile.segundo_nombre },
              { id: "last_name", label: "Primer Apellido", value: profile.last_name },
              { id: "segundo_apellido", label: "Segundo Apellido", value: profile.segundo_apellido },
              { id: "phone_number", label: "Teléfono", value: profile.phone_number },
              { id: "business_name", label: "Razón Social", value: profile.business_name },
              { id: "address", label: "Dirección", value: profile.address, full: true },
            ].map((field) => (
              <div
                key={field.id}
                className={`space-y-1 ${field.full ? "md:col-span-2" : ""}`}
              >
                <Label htmlFor={field.id} className="text-blue-800 font-medium">{field.label}</Label>
                <Input
                  id={field.id}
                  name={field.id}
                  value={field.value}
                  onChange={handleChange}
                  disabled={!editing}
                  className="bg-blue-100 text-blue-900 border border-blue-200 focus:ring-2 focus:ring-green-300"
                />
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 mt-6">
            {!editing ? (
              <Button
                type="button"
                className="bg-green-400 hover:bg-green-500 text-white shadow-md"
                onClick={() => setEditing(true)}
              >
                Editar
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-400 hover:bg-blue-500 text-white shadow-md flex items-center"
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
