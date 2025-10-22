import { useState, useEffect } from "react";
import { toast } from "./use-toast"; // o comenta esta línea si no usas toast

export interface RegisterFormData {
  email: string;
  password: string;
  documentType: 'nit' | 'cedula' | 'tarjeta_identidad' | 'pasaporte';
  documentNumber: string;
  phoneNumber: string;
  businessName?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Simula sesión persistente
  useEffect(() => {
    const savedUser = localStorage.getItem("mock_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000)); // simula carga
    setLoading(false);

    // Simula autenticación exitosa
    const mockUser = { email };
    setUser(mockUser);
    localStorage.setItem("mock_user", JSON.stringify(mockUser));

    // Mensaje visual (opcional)
    toast?.({
      title: "Inicio de sesión exitoso",
      description: `Bienvenido, ${email}`,
    });

    return { data: mockUser, error: null };
  };

  const signUp = async (formData: RegisterFormData) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);

    const mockUser = { email: formData.email };
    setUser(mockUser);
    localStorage.setItem("mock_user", JSON.stringify(mockUser));

    toast?.({
      title: "Registro completado",
      description: "Tu cuenta se ha creado correctamente",
    });

    return { data: mockUser, error: null };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("mock_user");

    toast?.({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return {
    user,
    session: null,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
