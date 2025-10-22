import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";

export type UserRole = "super_administrador" | "administrador" | "cliente" | null;

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setRole(null);
        setIsLoading(false);
        return;
      }
    };

    fetchRole();
  }, [user]);

  return { role, isLoading };
};
