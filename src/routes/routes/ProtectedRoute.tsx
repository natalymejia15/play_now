import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: number[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  let parsedUser: any = null;
  try {
    parsedUser = user ? JSON.parse(user) : null;
  } catch (e) {
    parsedUser = null;
  }

  const hasPermission = !!parsedUser && allowedRoles.includes(parsedUser.idRol);

  if (!hasPermission) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}