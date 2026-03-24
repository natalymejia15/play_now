import { Building2 } from "lucide-react";
import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";

const CIUDADES = ["Medellín", "Envigado", "Sabaneta", "Itagüí", "Bello", "La Estrella", "Copacabana"];

type Props = {
  values: { nombreCentro: string; ciudad: string; direccionMall: string; telefono: string };
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
};

export const MallInfoSection = ({ values, onChange, disabled }: Props) => (
  <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-4">
      <Building2 className="h-5 w-5 text-green-600" />
      <h3 className="text-lg font-semibold text-green-800">Información del Centro Comercial</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="nombreCentro">Nombre del Centro *</Label>
        <Input
          id="nombreCentro"
          value={values.nombreCentro}
          onChange={(e) => onChange("nombreCentro", e.target.value)}
          placeholder="Centro Comercial El Tesoro"
          required
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label>Ciudad *</Label>
        <Select value={values.ciudad} onValueChange={(v) => onChange("ciudad", v)} disabled={disabled}>
          <SelectTrigger><SelectValue placeholder="Seleccione una ciudad" /></SelectTrigger>
          <SelectContent>
            {CIUDADES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="direccionMall">Dirección *</Label>
        <Input
          id="direccionMall"
          value={values.direccionMall}
          onChange={(e) => onChange("direccionMall", e.target.value)}
          placeholder="Carrera 25 #1A Sur - 45"
          required
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono *</Label>
        <Input
          id="telefono"
          value={values.telefono}
          onChange={(e) => onChange("telefono", e.target.value)}
          placeholder="6045559999"
          required
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);