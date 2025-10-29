import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { LockIcon, EyeIcon, EyeOffIcon, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hook/use-toast";
import companyLogo from '../assets/login-hero.jpg';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Cambiar Contraseña - Plataforma de Diseño";
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                variant: "destructive",
            });
            return;
        }

        if (newPassword.length < 8) {
            toast({
                title: "Error",
                description: "La contraseña debe tener al menos 8 caracteres",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Password changed successfully");

        toast({
            title: "Contraseña actualizada",
            description: "Tu contraseña ha sido cambiada exitosamente",
        });

        setIsLoading(false);
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">
                <Card className="w-full shadow-medium border border-border bg-gradient-subtle rounded-2xl">
                    <CardHeader className="space-y-2 text-center">
                        <div className="flex justify-center">
                            <img
                                src={companyLogo}
                                alt="Logo de la empresa"
                                className="h-16 w-16 object-contain"
                            />
                        </div>
                        <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            Cambiar Contraseña
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-lg">
                            Ingresa tu nueva contraseña
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/** Nueva contraseña **/}
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-medium">
                                    Nueva contraseña
                                </Label>
                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Mínimo 8 caracteres"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="pl-10 pr-10 h-12 border border-border rounded-lg bg-background/90 focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                                    >
                                        {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/** Confirmar contraseña **/}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                    Confirmar contraseña
                                </Label>
                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirma tu contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10 pr-10 h-12 border border-border rounded-lg bg-background/90 focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/** Botón cambiar contraseña **/}
                            <Button
                                type="submit"
                                variant="auth"
                                disabled={isLoading}
                                className="mt-6 w-full h-12 bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Actualizando...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Send className="h-4 w-4" />
                                        <span>Cambiar contraseña</span>
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="pt-4 border-t">
                            <Link
                                to="/"
                                className="flex items-center justify-center text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
                            >
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>


    );
};

export default ChangePassword;
