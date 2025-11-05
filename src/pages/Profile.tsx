import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../hook/auth/use-auth";
import { useUserRole } from "../hook/users/use-user-role";
import { useToast } from "../hook/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { SuperAdminLayout } from "../components/layouts/SuperAdminLayout";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { ClientLayout } from "../components/layouts/ClientLayout";
import { Button } from "../components/ui/button";
import { useProfile } from "../hook/users/use-profile";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    profile,
    setProfile,
    loading,
    editing,
    setEditing,
    handleChange,
    handleCancel,
    handleSubmit,
    loadProfile,
  } = useProfile(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      loadProfile();
    }
  }, [user, authLoading, navigate]);

  const renderContent = () => {
    if (loading || authLoading || roleLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Mi Perfil</CardTitle>
          <CardDescription>Visualiza o edita tu información personal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="document_type">Tipo de Documento</Label>
                <Select
                  value={profile.document_type}
                  onValueChange={(value) => setProfile({ ...profile, document_type: value as string })}
                  disabled={!editing}
                >
                  <SelectTrigger id="document_type">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CC">Cédula</SelectItem>
                    <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                    <SelectItem value="PA">Pasaporte</SelectItem>
                    <SelectItem value="NIT">NIT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document_number">Número de Documento</Label>
                <Input
                  id="document_number"
                  name="document_number"
                  value={profile.document_number}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="first_name">Primer Nombre</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="segundo_nombre">Segundo Nombre</Label>
                <Input
                  id="segundo_nombre"
                  name="segundo_nombre"
                  value={profile.segundo_nombre}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Primer Apellido</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
                <Input
                  id="segundo_apellido"
                  name="segundo_apellido"
                  value={profile.segundo_apellido}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Teléfono</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={profile.phone_number}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_name">Razón Social</Label>
                <Input
                  id="business_name"
                  name="business_name"
                  value={profile.business_name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              {!editing ? (
                <Button type="button" onClick={() => setEditing(true)}>
                  Editar
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loading}>
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

  if (roleLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const content = renderContent();

  if (role === "superAdmin") {
    return <SuperAdminLayout>{content}</SuperAdminLayout>;
  }

  if (role === "admin") {
    return <AdminLayout>{content}</AdminLayout>;
  }

  return <ClientLayout>{content}</ClientLayout>;
};

export default Profile;
