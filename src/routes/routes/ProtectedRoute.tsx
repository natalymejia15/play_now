import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "@/interfaces";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: number[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  let parsedUser: User | null = null;

  try {
    parsedUser = JSON.parse(user) as User;
  } catch {
    parsedUser = null;
  }

  const hasPermission =
    parsedUser !== null && allowedRoles.includes(parsedUser.idRol);

  if (!hasPermission) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}