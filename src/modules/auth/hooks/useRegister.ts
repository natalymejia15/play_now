import { z } from "zod";
import type { AxiosError } from "axios";
import { toast, extractApiErrorMessage, type RegisterFormData, companySchema, naturalPersonSchema } from "@/lib";
import { registerUser } from "@/api";
import type { ApiErrorResponseRegister } from "../interfaces";

export const useRegister = () => {
  const signUp = async (formData: RegisterFormData) => {
    try {
      const schema =
        formData.tipoDocumento === "NIT"
          ? companySchema
          : naturalPersonSchema;

      schema.parse(formData);

      const data = await registerUser(formData);

      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente",
        variant: "success",
      });

      return { data, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error de validación",
          description:
            error.issues[0]?.message ||
            "Verifica los campos del formulario",
          variant: "destructive",
        });

        return { data: null, error };
      }
      const description = extractApiErrorMessage(
        error as AxiosError<ApiErrorResponseRegister>,
        "Ocurrió un error al registrar tu cuenta"
      );

      toast({
        title: "Error de registro",
        description,
        variant: "destructive",
      });

      return { data: null, error };
    }
  };

  return { signUp };
};