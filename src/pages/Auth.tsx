import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/auth/use-auth";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisrterForm";
import companyLogo from "../assets/logo.png";
import type { RegisterFormData } from "../interfaces/register.interfaces";
import { useRegister } from "../hook/users/use-register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, user } = useAuth();
  const { signUp } = useRegister();
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex justify-center mb-6">
            <img
              src={companyLogo}
              alt="Logo de la empresa"
              className="h-30 w-auto object-contain"
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Bienvenido de nuevo" : "Crear cuenta nueva"}
            </h1>
            <p className="text-gray-500">
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
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Plataforma segura de autenticación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
