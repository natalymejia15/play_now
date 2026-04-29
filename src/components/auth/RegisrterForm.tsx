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
import { useRegister } from "@/lib";
import type { DocumentType, RegisterFormProps } from "@/interfaces";

export const RegisterForm = ({ onSubmit, onToggleForm }: RegisterFormProps) => {

  const {
    documentType,
    setDocumentType,
    email,
    setEmail,
    documentNumber,
    setDocumentNumber,
    phoneNumber,
    setPhoneNumber,
    businessName,
    setBusinessName,
    address,
    setAddress,
    firstName,
    setFirstName,
    secondFirstName,
    setSecondFirstName,
    lastName,
    setLastName,
    secondLastName,
    setSecondLastName,
    isLoading,
    handleSubmit,
    isNIT
  } = useRegister({ onSubmit, onToggleForm });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-type">Tipo de documento</Label>
          <Select
            value={documentType}
            onValueChange={(value) => setDocumentType(value as DocumentType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CC">Cédula</SelectItem>
              <SelectItem value="NIT">NIT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="document-number">
            {isNIT ? "Número de NIT" : "Número de documento"}
          </Label>
          <Input
            id="document-number"
            type="text"
            placeholder={isNIT ? "Ej: 900123456" : "Número de documento"}
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {isNIT && (
          <>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="business-name">Razón social</Label>
              <Input
                id="business-name"
                type="text"
                placeholder="Nombre de la empresa"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="register-email">Correo electrónico</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </>
        )}
        {!isNIT && (
          <>
            <div className="space-y-2">
              <Label htmlFor="first-name">Nombre</Label>
              <Input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="second-name">Segundo nombre</Label>
              <Input
                id="second-name"
                type="text"
                value={secondFirstName}
                onChange={(e) => setSecondFirstName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Primer apellido</Label>
              <Input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="second-last-name">Segundo apellido</Label>
              <Input
                id="second-last-name"
                type="text"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="register-email">Correo electrónico</Label>
              <Input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number">Número de teléfono</Label>
          <Input
            id="phone-number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full h-12 text-base border border-green-600 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors"
          disabled={isLoading}
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
          className="w-full h-12 text-base border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          onClick={onToggleForm}
          disabled={isLoading}
        >
          Ya tengo cuenta
        </Button>
      </div>
    </form>
  );
};
