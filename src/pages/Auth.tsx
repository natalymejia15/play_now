import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/auth/use-auth";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisrterForm";
import companyLogo from "../assets/logo.png";
import type { RegisterFormData } from "../interfaces/register.interfaces";
import { useRegister } from "../hook/users/use-register";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {isLogin ? (
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        ) : (
          <button
            onClick={() => setIsLogin(true)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Volver al login
          </button>
        )}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <img
              src={companyLogo}
              alt="Logo de la empresa"
              className="text-lg font-bold text-primary-foreground"
            />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Sport<span className="text-primary">Hub</span>
          </span>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="mb-1 text-2xl font-bold text-foreground"> {isLogin ? "Bienvenido de nuevo" : "Crear cuenta nueva"}</h1>
              <p className="mb-6 text-sm text-muted-foreground">{isLogin
                ? "Ingresa tus credenciales para continuar"
                : "Regístrate como cliente en la plataforma"}</p>
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
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  );
};

export default Auth;
