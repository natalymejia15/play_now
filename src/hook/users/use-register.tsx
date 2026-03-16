import axios from "axios";
import { z } from "zod";
import { companySchema, naturalPersonSchema, type RegisterFormData } from "../../lib/validations/validation";
import { toast } from "@/lib";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useRegister = () => {
  const signUp = async (formData: RegisterFormData) => {
    try {
      const schema =
        formData.tipoDocumento === "NIT" ? companySchema : naturalPersonSchema;
      schema.parse(formData);

      const response = await axios.post(`${API_URL}/users/register`, formData);

      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente",
        variant:"success"
      });

      return { data: response.data, error: null };
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Error de validación",
          description:
            err.issues[0]?.message || "Verifica los campos del formulario",
        });
      } else if (axios.isAxiosError(err)) {
        toast({
          variant: "destructive",
          title: "Error de registro",
          description:
            err.response?.data?.message ||
            "Ocurrió un error al registrar tu cuenta",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error inesperado",
          description: err.message || "Ocurrió un error desconocido",
        });
      }

      console.log("Payload enviado:", formData);
      console.log("Error completo:", err);

      return { data: null, error: err };
    }
  };

  return { signUp };
};
