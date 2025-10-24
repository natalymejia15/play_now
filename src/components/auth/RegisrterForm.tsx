import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";

type DocumentType = "nit" | "cc" ;

interface RegisterFormData {
  email: string;
  password: string;
  documentType: DocumentType;
  documentNumber: string;
  businessName?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phoneNumber: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onToggleForm: () => void;
}

export const RegisterForm = ({ onSubmit, onToggleForm }: RegisterFormProps) => {
  const [documentType, setDocumentType] = useState<DocumentType>("cc");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondFirstName, setSecondFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isNIT = documentType === "nit";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;

    setIsLoading(true);
    try {
      const formData: RegisterFormData = {
        email,
        password,
        documentType,
        documentNumber,
        phoneNumber,
        ...(isNIT
          ? { businessName, address }
          : { firstName, lastName, birthDate }),
      };
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="document-type"
            className="text-foreground font-medium"
          >
            Tipo de documento
          </Label>
          <Select
            value={documentType}
            onValueChange={(value) =>
              setDocumentType(value as DocumentType)
            }
          >
            <SelectTrigger
              className="h-12 border border-border focus:border-primary transition-colors 
                         bg-white dark:bg-background appearance-none"
            >
              <SelectValue placeholder="Seleccione tipo de documento" />
            </SelectTrigger>
            <SelectContent
              className="bg-white dark:bg-background border border-border shadow-sm"
            >
              <SelectItem value="cc">Cédula</SelectItem>
              <SelectItem value="nit">NIT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="document-number"
            className="text-foreground font-medium"
          >
            {isNIT ? "Número de NIT" : "Número de documento"}
          </Label>
          <Input
            id="document-number"
            type="text"
            placeholder={
              isNIT ? "Ej: 900123456-7" : "Número de documento"
            }
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 border-border focus:border-primary transition-colors"
          />
        </div>

        {/* Campos dinámicos */}
        {isNIT ? (
          <>
            <div className="space-y-2">
              <Label
                htmlFor="business-name"
                className="text-foreground font-medium"
              >
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
              <Label
                htmlFor="register-email"
                className="text-foreground font-medium"
              >
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
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label
                htmlFor="first-name"
                className="text-foreground font-medium"
              >
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
              <Label
                htmlFor="second-name"
                className="text-foreground font-medium"
              >
                Segundo nombre
              </Label>
              <Input
                id="second-name"
                type="text"
                placeholder="Segundo nombre"
                value={secondFirstName}
                onChange={(e) => setSecondFirstName(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="last-name"
                className="text-foreground font-medium"
              >
                Primer apellido
              </Label>
              <Input
                id="last-name"
                type="text"
                placeholder="Primer apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="second-last-name"
                className="text-foreground font-medium"
              >
                Segundo apellido
              </Label>
              <Input
                id="second-last-name"
                type="text"
                placeholder="Segundo apellido"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-border focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="register-email"
                className="text-foreground font-medium"
              >
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
          </>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="text-foreground font-medium"
          >
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
        <div className="space-y-2">
          <Label
            htmlFor="phone-number"
            className="text-foreground font-medium"
          >
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
      </div>

      <div className="space-y-3">
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
