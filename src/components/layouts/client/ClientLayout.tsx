import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui";
import type { ClientLayoutProps } from "@/interfaces";
import { useLogin } from "@/modules";
import { navItems } from "@/config";

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  const navigate = useNavigate();
  const { signOut } = useLogin();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white text-gray-800">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 items-center h-16">
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-green-100 text-green-900 shadow-inner"
                        : "text-green-700 hover:bg-green-50 hover:text-green-900"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex justify-center">
              <h1 className="text-lg font-semibold text-green-900 tracking-wide">
                Reserva de canchas
              </h1>
            </div>

            <div className="flex justify-end items-center gap-3">
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="text-green-700 hover:text-green-900 hover:bg-green-100 transition-all"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">{children}</main>
    </div>
  );
};