import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import companyLogo from '../assets/login-hero.jpg';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import { z } from 'zod';
import { emailValidationSchema } from '../utils/validation';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';

const forgotPasswordSchema = z.object({
  email: emailValidationSchema,
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;


const ForgotPasswordForm = () => {
   const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
  setIsLoading(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500)); 

    setEmailSent(true);
  } catch (error) {
    console.error("Password reset error:", error);
  } finally {
    setIsLoading(false);
  }
};

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-auth border-0 bg-card">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="flex justify-center">
              <img 
                src={companyLogo} 
                alt="Logo de la empresa" 
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Correo Enviado</h1>
              <p className="text-muted-foreground">
                Revisa tu bandeja de entrada para el enlace de recuperación
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-success" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-auth border-0 bg-card">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <img 
              src={companyLogo} 
              alt="Logo de la empresa" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Recuperar Contraseña</h1>
            <p className="text-muted-foreground">
              Ingresa tu correo para recibir el enlace de recuperación
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  className="pl-10 h-12 border-border focus:border-input-focus focus:ring-input-focus"
                  {...form.register('email')}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="auth"
              disabled={isLoading}
              className="mt-6 bg-blue-600 text-white" 
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  <span>Enviando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 ">
                  <Send className="h-4 w-4" />
                  <span>Enviar enlace</span>
                </div>
              )}
            </Button>
          </form>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio de sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;