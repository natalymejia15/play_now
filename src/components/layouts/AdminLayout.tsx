import { useMemo, type ReactNode } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "../ui/sidebar";
import { LayoutDashboard, MapPin, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../hook/auth/use-auth";

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Gestionar Canchas", url: "/admin/courts", icon: MapPin },
];

interface AdminLayoutProps {
  children: ReactNode;
}

function InnerContent({ children }: { children: ReactNode }) {
  const { state, isMobile } = useSidebar();

  const SIDEBAR_OPEN_WIDTH = "14rem";
  const SIDEBAR_ICON_WIDTH = "3rem";

  const marginLeft = useMemo(() => {
    if (isMobile) return "0";
    return state === "expanded" ? SIDEBAR_OPEN_WIDTH : SIDEBAR_ICON_WIDTH;
  }, [state, isMobile]);

  return (
    <SidebarInset
      className="flex flex-col flex-1 transition-all duration-300 bg-white"
      style={{ marginLeft, minHeight: "100vh" }}
    >
      <header className="h-16 border-b border-green-200 flex items-center px-6 bg-white sticky top-0 z-10">
        <SidebarTrigger className="text-green-700 hover:text-green-900 transition-colors" />
      </header>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </SidebarInset>
  );
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full text-gray-800 bg-white">
        <Sidebar
          variant="sidebar"
          collapsible="offcanvas"
          className="bg-green-50 border-r border-green-200 shadow-lg"
        >
          <div className="flex flex-col h-full">
            
            {/* === ENCABEZADO === */}
            <div className="p-4 border-b border-green-200">
              <h2 className="text-lg font-semibold text-green-900">Administrador</h2>
              <p className="text-sm text-green-700 truncate">{user?.email}</p>
            </div>

            {/* === MENÚ PRINCIPAL === */}
            <SidebarContent className="flex-1">
              <SidebarGroup>
                <SidebarGroupLabel className="text-green-700 font-medium">
                  Menú Principal
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? "bg-green-200 text-green-900 font-semibold shadow-inner"
                                  : "hover:bg-green-100 hover:text-green-800"
                              }`
                            }
                          >
                            <item.icon className="mr-2 h-5 w-5 text-green-700" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            {/* === MI PERFIL (ABAJO, SOBRE CERRAR SESIÓN) === */}
            <div className="p-4 border-t border-green-200">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-lg mb-2 transition-all duration-200 ${
                          isActive
                            ? "bg-green-200 text-green-900 font-semibold shadow-inner"
                            : "hover:bg-green-100 hover:text-green-800"
                        }`
                      }
                    >
                      <User className="mr-2 h-5 w-5 text-green-700" />
                      <span>Mi Perfil</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full border-green-400 text-green-700 hover:bg-green-100 hover:text-green-900 transition-all"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </Sidebar>

        <InnerContent>{children}</InnerContent>
      </div>
    </SidebarProvider>
  );
};
