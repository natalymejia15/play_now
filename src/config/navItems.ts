import { LayoutDashboard, MapPin, User, Users } from "lucide-react";

export const navItems = [
  { name: "Dashboard", path: "/client/home", icon: LayoutDashboard },
  { name: "Gestionar Canchas", path: "/client/courts", icon: MapPin },
  { name: "Historico Canchas", path: "/client/historico", icon: MapPin },
  { name: "Mi Perfil", path: "/profile", icon: User },
];

export const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Gestionar Canchas", url: "/admin/courts", icon: MapPin },
];

export const menuSuperItems = [
  { title: "Dashboard", url: "/super-admin/dashboard", icon: LayoutDashboard },
  { title: "Gestionar CC", url: "/super-admin/malls", icon: Users },
];