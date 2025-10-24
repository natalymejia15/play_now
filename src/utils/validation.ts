import { z } from "zod";

export const emailValidationSchema = z
  .string()
  .trim()
  .nonempty({ message: "El correo es requerido" })
  .email({ message: "Verificar correo" })
  .max(255, { message: "El correo debe tener menos de 255 caracteres" });

export const passwordValidationSchema = z
  .string()
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  .max(128, { message: "La contraseña debe tener menos de 128 caracteres" });

const baseRegisterSchema = z.object({
  correo: emailValidationSchema,
  tipoDocumento: z.enum(["CC", "NIT"], { message: "Tipo de documento requerido" }),
  numeroDocumento: z.string().min(5, "Número de documento inválido"),
  celular: z.string().min(7, "Número de teléfono inválido"),
  direccion: z.string().min(3, "Dirección requerida"),
  password: passwordValidationSchema,
});

export const naturalPersonSchema = baseRegisterSchema.extend({
  tipoDocumento: z.literal("CC"),
  primerNombre: z.string().min(2, "Primer nombre requerido"),
  segundoNombre: z.string().optional(),
  primerApellido: z.string().min(2, "Primer apellido requerido"),
  segundoApellido: z.string().optional(),
  razonSocial: z.string(), 
}).refine((data) => {
  if (data.password === data.numeroDocumento) return true;
  return /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
}, {
  message: "La contraseña debe contener al menos un carácter especial",
  path: ["password"],
});


export const companySchema = baseRegisterSchema.extend({
  tipoDocumento: z.literal("NIT"),
  razonSocial: z.string().min(2, "Razón social requerida"),
  primerNombre: z.string(),
  segundoNombre: z.string(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
}).refine((data) => {
  if (data.password === data.numeroDocumento) return true;
  return /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
}, {
  message: "La contraseña debe contener al menos un carácter especial",
  path: ["password"],
});

export type RegisterFormData = z.infer<typeof naturalPersonSchema> | z.infer<typeof companySchema>;
