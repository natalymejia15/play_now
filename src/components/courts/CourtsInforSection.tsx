import { useRef } from "react";
import { Calendar, DollarSign, ImageIcon, MapPin } from "lucide-react";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { useImageCourts } from "@/modules";
import { diasSemana } from "@/constants";
import type { CourtsProps } from "@/interfaces";

export const CourtsInfoSection = ({
  values,
  onChange,
  disabled,
}: CourtsProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { deports, deportsLoading, previewUrl } = useImageCourts({
    values,
  });

  const toggleDia = (dia: string) => {
    const current = values.diasDisponibles ?? [];

    const updated = current.includes(dia)
      ? current.filter((d) => d !== dia)
      : [...current, dia];

    onChange("diasDisponibles", updated);
  };

  return (
    <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
      
      {/* INFO GENERAL */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-green-800">
          Información de la cancha
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nombre de la Cancha *</Label>
          <Input
            id="nombreCancha"
            value={values.nombreCancha}
            onChange={(e) => onChange("nombreCancha", e.target.value)}
            placeholder="Cancha Sintética Los Pinos"
            required
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label>Teléfono *</Label>
          <Input
            id="telefono"
            value={values.telefono}
            onChange={(e) => onChange("telefono", e.target.value)}
            placeholder="6045559999"
            maxLength={10}
            required
            disabled={disabled}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Dirección *</Label>
          <Input
            id="direccion"
            value={values.direccion}
            onChange={(e) => onChange("direccion", e.target.value)}
            placeholder="Cra 25 #15-40"
            required
            disabled={disabled}
          />
        </div>
      </div>

      {/* HORARIOS */}
      <div className="space-y-4 p-6 rounded-xl border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-green-700" />
          <h3 className="text-lg font-semibold text-green-800">
            Horarios y Días Disponibles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hora de Inicio *</Label>
            <Input
              id="horarioInicio"
              type="time"
              value={values.horarioInicio}
              onChange={(e) => onChange("horarioInicio", e.target.value)}
              required
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <Label>Hora de Fin *</Label>
            <Input
              id="horarioFin"
              type="time"
              value={values.horarioFin}
              onChange={(e) => onChange("horarioFin", e.target.value)}
              required
              disabled={disabled}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Días Disponibles *</Label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {diasSemana.map((dia) => (
              <label
                key={dia}
                className="flex items-center gap-2 text-green-800"
              >
                <input
                  type="checkbox"
                  checked={values.diasDisponibles.includes(dia)}
                  onChange={() => toggleDia(dia)}
                  required={values.diasDisponibles.length === 0}
                  disabled={disabled}
                />
                <span>{dia}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* COSTOS */}
      <div className="space-y-4 p-6 rounded-xl border border-green-100 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-green-800">
            Detalles y Costos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Valor por Hora *</Label>
            <Input
              id="valorHora"
              type="number"
              value={values.valorHora}
              onChange={(e) => onChange("valorHora", e.target.value)}
              placeholder="50000"
              required
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <Label>Deporte *</Label>

            <Select
              value={values.sportId?.toString() ?? ""}
              onValueChange={(value) =>
                onChange("sportId", value ? Number(value) : null)
              }
              disabled={disabled || deportsLoading}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un deporte" />
              </SelectTrigger>

              <SelectContent>
                {deports.map((d) => (
                  <SelectItem key={d.id} value={d.id.toString()}>
                    {d.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Responsable *</Label>
          <Input
            id="responsable"
            value={values.responsable}
            onChange={(e) => onChange("responsable", e.target.value)}
            placeholder="Juan Pérez"
            required
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label>Detalles Adicionales</Label>
          <Input
            id="detalles"
            value={values.detalles}
            onChange={(e) => onChange("detalles", e.target.value)}
            placeholder="Cancha sintética 7x7 con luces"
            disabled={disabled}
          />
        </div>
      </div>

      {/* IMAGEN */}
      <div className="space-y-4 p-6 rounded-xl border border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="h-5 w-5 text-green-700" />
          <h3 className="text-lg font-semibold text-green-800">
            Imagen de la Cancha
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            
            <div className="w-full sm:w-40 h-28 bg-gray-50 rounded-md border border-dashed flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-sm text-muted-foreground px-2 text-center">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  onChange("imagen", e.target.files?.[0] || null)
                }
                disabled={disabled}
                required={!previewUrl}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};