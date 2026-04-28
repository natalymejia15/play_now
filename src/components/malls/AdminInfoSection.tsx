import { User } from "lucide-react";
import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { ADMIN_FIELDS } from "@/constants";

type Props = {
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
};

export const AdminInfoSection = ({ values, onChange, disabled }: Props) => (
  <div className="space-y-4 p-6 rounded-xl border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-4">
      <User className="h-5 w-5 text-green-800" />
      <h3 className="text-lg font-semibold text-green-800">Información del Administrador</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Tipo de Documento *</Label>
        <Select value={values.tipoDocumento} onValueChange={(v) => onChange("tipoDocumento", v)} disabled={disabled}>
          <SelectTrigger><SelectValue placeholder="Seleccione tipo de documento" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
            <SelectItem value="NIT">NIT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {ADMIN_FIELDS.map((field) => (
        <div className="space-y-2" key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            type={field.type || "text"}
            value={values[field.id] ?? ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.label.includes("*")}
            disabled={disabled}
          />
        </div>
      ))}

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="direccionAdmin">Dirección *</Label>
        <Input
          id="direccionAdmin"
          value={values.direccionAdmin ?? ""}
          onChange={(e) => onChange("direccionAdmin", e.target.value)}
          placeholder="Calle 12 #34-56"
          required
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);