import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: number[]; 
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const userCtx = useContext(UserContext);

  if (!userCtx) {
    throw new Error("ProtectedRoute debe estar dentro de UserProvider");
  }

  const { user, loading } = userCtx;

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.idRol)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
}


export default ProtectedRoute;
