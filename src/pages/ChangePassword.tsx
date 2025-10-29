import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { LockIcon, EyeIcon, EyeOffIcon, Send } from "lucide-react";
import companyLogo from "../assets/login-hero.jpg";
import { useChangePassword } from "../hook/use-change-password";

const ChangePassword = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { changePassword, isLoading, error } = useChangePassword(token);

  useEffect(() => {
    document.title = "Cambiar Contraseña - Plataforma";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword({ newPassword, confirmPassword });
  };


  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="w-full shadow-medium border border-border bg-gradient-subtle rounded-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <img src={companyLogo} alt="Logo" className="h-16 w-16 object-contain" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Cambiar Contraseña
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Ingresa tu nueva contraseña
            </CardDescription>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">Nueva contraseña</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border border-border rounded-lg bg-background/90 focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all"
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
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar contraseña</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border border-border rounded-lg bg-background/90 focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all"
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

export default ChangePassword;
