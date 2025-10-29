import { useEffect, useState } from "react";
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
import type { RegisterFormData } from "../../interfaces/register.interfaces";

type DocumentType = "NIT" | "CC";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onToggleForm: () => void;
}

export const RegisterForm = ({ onSubmit, onToggleForm }: RegisterFormProps) => {
  const [documentType, setDocumentType] = useState<DocumentType>("CC");
  const [email, setEmail] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondFirstName, setSecondFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isNIT = documentType === "NIT";


  useEffect(() => {
    document.title = "Registrar- Play now";
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData: RegisterFormData = {
        tipoDocumento: documentType.toUpperCase() as "CC" | "NIT",
        numeroDocumento: documentNumber,
        primerNombre: !isNIT ? firstName : "",
        segundoNombre: !isNIT ? secondFirstName : "",
        primerApellido: !isNIT ? lastName : "",
        segundoApellido: !isNIT ? secondLastName : "",
        razonSocial: isNIT ? businessName : "",
        correo: email,
        celular: phoneNumber,
        direccion: address,
        password: documentNumber,
        idRol: 3,
      };

      await onSubmit(formData);
    } catch (error: any) {
      console.error("Error en handleSubmit:", error);
      if (error.response) console.error("Respuesta del backend:", error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "h-12 border border-gray-300 rounded-lg bg-gray-50 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Tipo de documento */}
        <div className="space-y-2">
          <Label htmlFor="document-type" className="text-gray-700 font-medium">
            Tipo de documento
          </Label>
          <Select value={documentType} onValueChange={(value) => setDocumentType(value as DocumentType)}>
            <SelectTrigger className={`h-12 border border-gray-300 rounded-lg bg-gray-50 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-colors`}>
              <SelectValue placeholder="Seleccione tipo de documento" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-sm">
              <SelectItem value="CC">Cédula</SelectItem>
              <SelectItem value="NIT">NIT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="document-number" className="text-gray-700 font-medium">
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
            className={inputClass}
          />
        </div>
        {isNIT ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="business-name" className="text-gray-700 font-medium">
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
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-gray-700 font-medium">
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
                className={inputClass}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-gray-700 font-medium">
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
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="second-name" className="text-gray-700 font-medium">
                Segundo nombre
              </Label>
              <Input
                id="second-name"
                type="text"
                placeholder="Segundo nombre"
                value={secondFirstName}
                onChange={(e) => setSecondFirstName(e.target.value)}
                disabled={isLoading}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className="text-gray-700 font-medium">
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
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="second-last-name" className="text-gray-700 font-medium">
                Segundo apellido
              </Label>
              <Input
                id="second-last-name"
                type="text"
                placeholder="Segundo apellido"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
                disabled={isLoading}
                className={inputClass}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="register-email" className="text-gray-700 font-medium">
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
                className={inputClass}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-700 font-medium">
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
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number" className="text-gray-700 font-medium">
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
            className={inputClass}
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
