import { useMemo, type ReactNode } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hook/use-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/super-admin/dashboard", icon: LayoutDashboard },
  { title: "Gestionar Usuarios", url: "/super-admin/users", icon: Users },
];

interface SuperAdminLayoutProps {
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
      className="flex flex-col flex-1 transition-all duration-200 bg-gray-100"
      style={{ marginLeft, minHeight: "100vh" }}
    >
      <header className="h-16 border-b border-gray-300 flex items-center px-6 bg-gray-200 sticky top-0 z-10">
        <SidebarTrigger className="text-gray-700" />
        <h1 className="ml-4 text-lg font-semibold text-gray-900">
          Panel de Administración
        </h1>
      </header>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </SidebarInset>
  );
}

export const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100 text-gray-800">
        <Sidebar
          variant="sidebar"
          collapsible="offcanvas"
          className="bg-gray-200 border-r border-gray-300"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-900">Super Admin</h2>
              <p className="text-sm text-gray-600 truncate">{user?.email}</p>
            </div>

            <SidebarContent className="flex-1">
              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-700">Menú Principal</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded-md transition-colors ${
                                isActive
                                  ? "bg-gray-400 text-gray-900 font-medium"
                                  : "hover:bg-gray-300 text-gray-700"
                              }`
                            }
                          >
                            <item.icon className="mr-2 h-4 w-4 text-gray-700" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <div className="p-4 border-t border-gray-300 mt-auto">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full border-gray-400 text-gray-700 hover:bg-gray-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
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
