import { Trophy } from "lucide-react";
import { Input, Label } from "@/components";

type Props = {
    values: { nombre: string; descripcion: string; cantidad: number };
    onChange: (field: string, value: string) => void;
    disabled?: boolean;
};

export const DeportsInfoSection = ({ values, onChange, disabled }: Props) => (
    <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Información del Deporte</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="nombreCentro">Nombre del Deporte *</Label>
                <Input
                    id="nombre"
                    value={values.nombre}
                    onChange={(e) => onChange("nombre", e.target.value)}
                    placeholder="Futbol 11"
                    required
                    disabled={disabled}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción </Label>
                <Input
                    id="descripcion"
                    value={values.descripcion}
                    onChange={(e) => onChange("descripcion", e.target.value)}
                    placeholder="Futbol ..."
                    disabled={disabled}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad </Label>
                <Input
                    id="cantidad"
                    value={values.cantidad}
                    onChange={(e) => onChange("cantidad", e.target.value)}
                    placeholder="11"
                    disabled={disabled}
                    required
                />
            </div>
        </div>
    </div>
);