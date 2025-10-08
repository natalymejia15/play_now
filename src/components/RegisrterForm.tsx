import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";

type DocumentType = 'nit' | 'cedula' | 'tarjeta_identidad' | 'pasaporte';

interface RegisterFormData {
  email: string;
  password: string;
  documentType: DocumentType;
  documentNumber: string;
  // For NIT
  businessName?: string;
  address?: string;
  // For natural person
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  // Common
  phoneNumber: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onToggleForm: () => void;
}

export const RegisterForm = ({ onSubmit, onToggleForm }: RegisterFormProps) => {
  const [documentType, setDocumentType] = useState<DocumentType>("cedula");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // NIT fields
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  
  // Natural person fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  
  const isNIT = documentType === 'nit';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);
    try {
      const formData: RegisterFormData = {
        email,
        password,
        documentType,
        documentNumber,
        phoneNumber,
        ...(isNIT ? {
          businessName,
          address,
        } : {
          firstName,
          lastName,
          birthDate,
        })
      };
      
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-type" className="text-foreground font-medium">
            Tipo de documento
          </Label>
          <Select value={documentType} onValueChange={(value) => setDocumentType(value as DocumentType)}>
            <SelectTrigger className="h-12 border-border focus:border-primary transition-colors">
              <SelectValue placeholder="Seleccione tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cedula">Cédula</SelectItem>
              <SelectItem value="tarjeta_identidad">Tarjeta de Identidad</SelectItem>
              <SelectItem value="pasaporte">Pasaporte</SelectItem>
              <SelectItem value="nit">NIT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-number" className="text-foreground font-medium">
            {isNIT ? 'Número de NIT' : 'Número de documento'}
          </Label>
          <Input
            id="document-number"
            type="text"
            placeholder={isNIT ? 'Ej: 900123456-7' : 'Número de documento'}
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border-border focus:border-primary transition-colors"
          />
        </div>

        {isNIT ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="business-name" className="text-foreground font-medium">
                Razón social
              </Label>
              <Input
                id="business-name"
                type="text"
                placeholder="Nombre de la empresa"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-foreground font-medium">
                Dirección
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Dirección de la empresa"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-foreground font-medium">
                Nombre
              </Label>
              <Input
                id="first-name"
                type="text"
                placeholder="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name" className="text-foreground font-medium">
                Apellido
              </Label>
              <Input
                id="last-name"
                type="text"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth-date" className="text-foreground font-medium">
                Fecha de nacimiento
              </Label>
              <Input
                id="birth-date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-foreground font-medium">
            Correo electrónico
          </Label>
          <Input
            id="register-email"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border-border focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone-number" className="text-foreground font-medium">
            Número de teléfono
          </Label>
          <Input
            id="phone-number"
            type="tel"
            placeholder="Ej: 3001234567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border-border focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-foreground font-medium">
            Contraseña
          </Label>
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border-border focus:border-primary transition-colors"
          />
          <p className="text-xs text-muted-foreground">
            Debe contener al menos 8 caracteres y un carácter especial
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-foreground font-medium">
            Confirmar contraseña
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border-border focus:border-primary transition-colors"
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-destructive">Las contraseñas no coinciden</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          variant="auth"
          size="lg"
          className="w-full h-12 text-base border bg-blue-600 text-white"
          disabled={isLoading || password !== confirmPassword}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Registrando...
            </>
          ) : (
            "Crear cuenta"
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full h-12 text-base border-primary/30 hover:border-primary hover:bg-primary/5"
          onClick={onToggleForm}
          disabled={isLoading}
        >
          Ya tengo cuenta
        </Button>
      </div>
    </form>
  );
};
