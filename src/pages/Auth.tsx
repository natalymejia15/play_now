import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/use-auth";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisrterForm";
import companyLogo from "@/assets/login-hero.jpg";
import type { RegisterFormData } from "../interfaces/register.interfaces";
import { useRegister } from "../hook/use-register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, user } = useAuth();
  const {signUp} = useRegister();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

 const handleLogin = async (email: string, password: string) => {
  const { user, error } = await signIn(email, password);

  if (!error && user) {
    switch (user.idRol) {
      case 1:
        navigate("/super-admin/dashboard");
        break;
      case 2:
        navigate("/admin/dashboard");
        break;
      case 3:
        navigate("/client/home");
        break;
      default:
        navigate("/");
        break;
    }
  }
};

  const handleRegister = async (formData: RegisterFormData) => {
    const { error } = await signUp(formData);
    if (!error) {
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl shadow-card border border-border/50 p-8">
          <div className="flex justify-center mb-8">
            <img
              src={companyLogo}
              alt="Logo de la empresa"
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Bienvenido de nuevo" : "Crear cuenta nueva"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Ingresa tus credenciales para continuar"
                : "Regístrate como cliente en la plataforma"}
            </p>
          </div>
          <div className="space-y-6">
            {isLogin ? (
              <LoginForm
                onSubmit={handleLogin}
                onToggleForm={() => setIsLogin(false)}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                onToggleForm={() => setIsLogin(true)}
              />
            )}
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Plataforma segura de autenticación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
