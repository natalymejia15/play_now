import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";

export type UserRole = "superAdmin" | "admin" | "usuario" | null;

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    // Mapea el idRol (numérico) al nombre del rol
    const roleMap: Record<number, UserRole> = {
      1: "superAdmin",
      2: "admin",
      3: "usuario",
    };

    // Si el backend usa 'id_rol' o 'roleId', ajusta aquí
    const userRoleId = user.id_rol || user.roleId || user.idRol;

    if (userRoleId && roleMap[userRoleId]) {
      setRole(roleMap[userRoleId]);
    } else {
      setRole(null);
    }

    setIsLoading(false);
  }, [user]);

  return { role, isLoading };
};
