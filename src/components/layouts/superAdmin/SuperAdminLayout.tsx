import { useNavigate, NavLink } from "react-router-dom";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import type { SuperAdminLayoutProps } from "@/interfaces/layout.interfaces";
import { Button, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui";
import { menuSuperItems } from "@/config/navItems";
import { LogOut, User } from "lucide-react";
import { InnerContent } from "../admin";

export const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useLogin();

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
            <div className="p-4 border-b border-green-200">
              <h2 className="text-lg font-semibold text-green-900">Super Admin</h2>
              <p className="text-sm text-green-700 truncate">{user?.correo}</p>
            </div>
            <SidebarContent className="flex-1">
              <SidebarGroup>
                <SidebarGroupLabel className="text-green-700 font-medium">
                  Menú Principal
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuSuperItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${isActive
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
            <div className="p-4 border-t border-green-200">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-lg mb-2 transition-all duration-200 ${isActive
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
