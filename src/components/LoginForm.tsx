import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onToggleForm: () => void;
}

export const LoginForm = ({ onSubmit, onToggleForm }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium text-grey-500">
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
            className="h-12 border border-grey-100 focus:border-primary border-grey-400 bg-grey-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border-border focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          variant="auth"
          size="lg"
          className="w-full h-12 text-base border bg-blue-600 text-white"
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
          size="lg"
          className="w-full h-12 text-base border-blue-40 hover:border-primary hover:bg-primary/5 "
          onClick={onToggleForm}
          disabled={isLoading}
        >
          Registrar nueva cuenta
        </Button>
        <div className="text-center">
          <Link to="/forgot-password" className="text-primary hover:text-primary-hover transition-smooth text-sm font-medium">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </form>
  );
};
