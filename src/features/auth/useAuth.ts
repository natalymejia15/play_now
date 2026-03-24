import { UserContext } from "@/components";
import { useContext } from "react";

export function useAuth() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return ctx;
}
