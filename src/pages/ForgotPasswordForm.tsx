import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import companyLogo from '../assets/logo.png';
import { emailValidationSchema } from '../utils/validation';
import { useForgotPassword } from '../hook/use-forgot-password';

const forgotPasswordSchema = z.object({
  email: emailValidationSchema,
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { isLoading, emailSent, error, sendResetEmail } = useForgotPassword();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordFormData) => sendResetEmail(data.email);

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
            <CardHeader className="space-y-2 text-center">
              <div className="flex justify-center">
                <img src={companyLogo} alt="Logo de la empresa" className="h-30 object-contain" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Correo Enviado</h1>
                <p className="text-muted-foreground">
                  Revisa tu bandeja de entrada para el enlace de recuperación
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full border-border hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio de sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <img src={companyLogo} alt="Logo de la empresa" className="h-30 object-contain" />
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
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    className="pl-10 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-colors"
                    {...form.register('email')}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button
                type="submit"
                variant="auth"
                disabled={isLoading}
                className="mt-6 w-full h-12 bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
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
              className="w-full mt-2 border-border hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
