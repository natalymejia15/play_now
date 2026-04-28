import { useState } from "react";
import type { AxiosError } from "axios";
import { toast, extractApiErrorMessage } from "@/lib";
import { sendResetPasswordEmail } from "@/api";
import type { ApiErrorResponseResetPassword } from "../interfaces";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const sendResetEmail = async (email: string) => {
    setIsLoading(true);

    try {
      await sendResetPasswordEmail({ email });
      setEmailSent(true);

      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada",
      });
    } catch (error) {
      const description = extractApiErrorMessage(
        error as AxiosError<ApiErrorResponseResetPassword>,
        "No se pudo enviar el correo de recuperación"
      );

      toast({
        title: "Error",
        description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    emailSent,
    sendResetEmail,
  };
};