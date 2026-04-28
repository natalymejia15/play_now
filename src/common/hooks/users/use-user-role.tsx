import { useLogin } from "@/modules";
import { useEffect, useState } from "react";

export type UserRole = "superAdmin" | "admin" | "usuario" | null;

export const useUserRole = () => {
  const { user } = useLogin();
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setIsLoading(false);
      return;
    }
    const roleMap: Record<number, UserRole> = {
      1: "superAdmin",
      2: "admin",
      3: "usuario",
    };
    const userRoleId = user.idRol|| user.idRol || user.idRol;

    if (userRoleId && roleMap[userRoleId]) {
      setRole(roleMap[userRoleId]);
    } else {
      setRole(null);
    }

    setIsLoading(false);
  }, [user]);

  return { role, isLoading };
};
