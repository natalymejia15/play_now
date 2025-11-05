import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "../../hook/auth/use-auth";
import type { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b border-green-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-green-900">Reservas</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-green-700 truncate">{user?.email}</span>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-green-400 text-green-700 hover:bg-green-100 hover:text-green-900 transition-all"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};
