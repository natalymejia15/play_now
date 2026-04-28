import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LockIcon, EyeIcon, EyeOffIcon, Send } from "lucide-react";
import companyLogo from "@/assets/logo.png";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from "@/components";
import { useRecoverPassword } from "../hooks";

export const RecoverPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { changePassword, isLoading } = useRecoverPassword(token);

  useEffect(() => {
    document.title = "Cambiar Contraseña - Play now";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword({ newPassword, confirmPassword });
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <img src={companyLogo} alt="Logo" className="h-30 object-contain" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Cambiar Contraseña
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Ingresa tu nueva contraseña
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-foreground">Nueva contraseña</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-500" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                  >
                    {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirmar contraseña</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
                <ul className="mt-2 text-xs text-gray-500 space-y-1 list-disc list-inside">
                  <li>Debe tener al menos 8 caracteres</li>
                  <li>Debe incluir una letra mayúscula</li>
                  <li>Debe incluir una letra minúscula</li>
                  <li>Debe incluir un número</li>
                  <li>Debe incluir un símbolo (por ejemplo: !@#$%)</li>
                </ul>
              </div>
              <Button
                type="submit"
                variant="auth"
                disabled={isLoading}
                className="mt-6 w-full h-12 bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Actualizando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Cambiar contraseña</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="pt-4 border-t">
              <Link to="/" className="flex items-center justify-center text-green-600 hover:text-green-700 transition-colors text-sm font-medium">
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
