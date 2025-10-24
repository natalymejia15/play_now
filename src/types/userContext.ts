import type { User } from "./user"

export type UserContextType ={
    user: User | null;
     login: (userData: User) => void; 
    logout:() => void;
}