import { ClipboardClock, LayoutDashboard, MapPin, User, Users } from "lucide-react";

export const navItems = [
  { name: "Home", path: "/client/home", icon: LayoutDashboard },
  { name: "Historico Reservas", path: "/client/historico", icon: MapPin },
  { name: "Mi Perfil", path: "/profile", icon: User },
];

export const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Gestionar Canchas", url: "/admin/courts", icon: MapPin },
  { title: "Historico de reservas", url: "/admin/history", icon: ClipboardClock }
];

export const menuSuperItems = [
  { title: "Dashboard", url: "/super-admin/dashboard", icon: LayoutDashboard },
  { title: "Gestionar CC", url: "/super-admin/malls", icon: Users },
];