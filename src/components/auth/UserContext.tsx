import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UserContextType } from "@/types/userContext";
import type { User } from "@/types/user";
import { clearAuth, getStoredUser, getToken, setApiToken, setAuth } from "@/features";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

  const login = (userData: User, token: string) => {
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
