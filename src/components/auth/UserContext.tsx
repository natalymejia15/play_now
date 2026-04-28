import { createContext, useEffect, useState, type ReactNode } from "react";
import { clearAuth, getStoredUser, getToken, setApiToken, setAuth } from "@/features";
import type { UserContextType, Users } from "@/interfaces";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setApiToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = (userData: Users, token: string) => {
    setUser(userData);
    setAuth(userData, token);
  };

  const logout = () => {
    setUser(null);
    clearAuth();
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
