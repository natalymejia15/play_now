import { useState } from 'react';
import axios from 'axios';

const API_URL =  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendResetEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(   `${API_URL}/users/reset-password`,{ email });
      if (response.status === 200) {
        setEmailSent(true);
      } else {
        setError('No se pudo enviar el correo de recuperación.');
      }
    } catch (err: any) {
      console.error('Error al enviar el correo:', err);
      setError(err.response?.data?.message || 'Error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    emailSent,
    error,
    sendResetEmail,
  };
};
