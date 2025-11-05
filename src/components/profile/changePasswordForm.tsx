import { useState } from "react";
import { Loader2, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { usePassword } from "../../hook/password/use-password";

export const ChangePasswordForm = () => {
  const { changePassword, isLoading } = usePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    await changePassword({ currentPassword, newPassword });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-green-100">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-green-900 flex items-center gap-2">
          <Key className="h-6 w-6 text-green-800" /> Cambiar Contraseña
        </CardTitle>
        <CardDescription className="text-green-700">
          Actualiza tu contraseña de acceso
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "currentPassword", label: "Contraseña Actual", value: currentPassword, setter: setCurrentPassword },
                  { id: "newPassword", label: "Nueva Contraseña", value: newPassword, setter: setNewPassword },
                  { id: "confirmPassword", label: "Confirmar Contraseña", value: confirmPassword, setter: setConfirmPassword },
                ].map(field => (
                  <div className="space-y-2" key={field.id}>
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      type="password"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      placeholder="********"
                      required
                      className="rounded-lg border border-gray-300 bg-blue-50 focus:border-green-400 focus:ring-green-200 text-blue-900"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="submit"
                className="rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all flex items-center"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Cambiar Contraseña
              </Button>
            </div>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
