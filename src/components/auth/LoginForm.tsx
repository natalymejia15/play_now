import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { LoginFormProps } from "../../interfaces/auth.interfaces";

export const LoginForm = ({ onSubmit, onToggleForm }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    document.title = "Login- Play now";
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium text-gray-700">
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border border-gray-300 rounded-lg bg-gray-50 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-colors"
          />
        </div>
        <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Contraseña
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 pr-12 border border-gray-300 rounded-lg bg-gray-50 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      </div>
      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full h-12 text-base border border-green-600 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Ingresando...
            </>
          ) : (
            "Ingresar"
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 text-base border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          onClick={onToggleForm}
          disabled={isLoading}
        >
          Registrar nueva cuenta
        </Button>

        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </form>
  );
};
