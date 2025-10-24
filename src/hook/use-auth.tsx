import { useState, useEffect, useContext } from "react";
import { toast } from "./use-toast";
import axios from "axios";
import { UserContext } from "../context/UserContext";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { login } = useContext(UserContext)!;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setSession(true);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        correo: email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user) {
        login(user);
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        });
      }

       return { user, error: null as string | null };
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description:
          "El campo usuario o contraseña son incorrectos",
      });
      return { error: err };
    }
  };

  

  const signOut = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch {
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setSession(null);
    localStorage.removeItem("user");

    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
  };
};
