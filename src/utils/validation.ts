import { z } from 'zod';

// Email validation schema according to user story requirements
export const emailValidationSchema = z
  .string()
  .trim()
  .nonempty({ message: "El correo es requerido" })
  .email({ message: "Verificar correo" })
  .max(255, { message: "El correo debe tener menos de 255 caracteres" });

// Password validation schema - must have special character
export const passwordValidationSchema = z
  .string()
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, { 
    message: "La contraseña debe contener al menos un carácter especial" 
  })
  .max(128, { message: "La contraseña debe tener menos de 128 caracteres" });

// Login form validation schema
export const loginSchema = z.object({
  email: emailValidationSchema,
  password: z.string().nonempty({ message: "La contraseña es requerida" })
});

// Registration form validation schema
export const registrationSchema = z.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;