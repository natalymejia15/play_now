import type { User } from "./user"

export type UserContextType ={
    user: User | null;
    login: (name: string, email: string)=>void;
    logout:() => void;
}