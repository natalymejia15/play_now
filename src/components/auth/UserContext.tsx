import { createContext } from "react";
import type { UserContextType } from "@/interfaces";

export const UserContext = createContext<UserContextType | undefined>(undefined);


