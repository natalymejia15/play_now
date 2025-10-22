import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/login-hero.jpg";
import { useAuth, type RegisterFormData } from "../hook/use-auth";
import { LoginForm } from "..//components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisrterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (!error) {
      navigate("/");
    }
  };

  const handleRegister = async (formData: RegisterFormData) => {
    const { error } = await signUp(formData);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div
        className={`w-full transition-all duration-300 ${isLogin ? "max-w-md" : "max-w-2xl"
          }`}
      >
        <div
          className={`rounded-2xl shadow-2xl border border-white/30 transition-all duration-300
        ${isLogin
              ? "bg-white/80 backdrop-blur-lg p-8"
              : "bg-white/90 backdrop-blur-md p-6"
            }`}
          style={{
            minHeight: isLogin ? "auto" : "80vh", // reduce altura en registro
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={companyLogo}
              alt="Logo de la empresa"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Bienvenido de nuevo" : "Crear cuenta nueva"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Ingresa tus credenciales para continuar"
                : "Regístrate como cliente en la plataforma"}
            </p>
          </div>

          {/* Formulario */}
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
        </div>
      </div>
    </div>

  );
};

export default Auth;
