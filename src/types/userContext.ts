import type { User } from "./user"

export interface UserContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User, token: string) => void; 
    logout: () => void;
}