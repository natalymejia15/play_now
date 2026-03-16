import { setApiToken } from "@/features";
import type { User } from "@/interfaces";

export const ROLE_ROUTES: Record<number, string> = {
    1: "/super-admin/dashboard",
    2: "/admin/dashboard",
    3: "/client/home",
};

export const getRoleRoute = (idRol?: number) =>
    idRol ? (ROLE_ROUTES[idRol] ?? "/dashboard") : "/dashboard";

export const persistSession = (token: string, user: User) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    setApiToken(token);
};
