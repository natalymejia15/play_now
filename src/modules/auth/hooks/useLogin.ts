import { useAppDispatch, useAppSelector } from "@/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginData } from "../interfaces";
import { clearAuth, loginUser, logoutUser } from "@/features";
import { extractErrorMessage, getRoleRoute, persistSession, showErrorToast, type RegisterFormData } from "@/lib";
import type { User } from "@/interfaces";
import { useRegister } from "./useRegister";


export const useLogin = () => {
    const dispatch = useAppDispatch();
    const { signUp } = useRegister();
    const navigate = useNavigate();
    const { loading, error: reduxError } = useAppSelector((state) => state.auth);

    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);
    const [localError, setLocalError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem("user");
            if (stored) setUser(JSON.parse(stored));
        } catch {
            setUser(null);
        } finally {
            setInitializing(false);
        }
    }, []);

    const signIn = async (
        email: string,
        password: string
    ): Promise<{ user: User | null; error: string | null }> => {
        setLocalError(null);
        try {
            const result = await dispatch(loginUser({ email, password })).unwrap();
            const { token, user: loggedUser } = result;

            if (!token) {
                const msg = "Respuesta de login inesperada";
                setLocalError(msg);
                return { user: null, error: msg };
            }

            if (loggedUser) {
                persistSession(token, loggedUser);
                setUser(loggedUser);
            }

            return { user: loggedUser ?? null, error: null };
        } catch (err) {
            const message = extractErrorMessage(err);
            setLocalError(message);
            return { user: null, error: message };
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (
        e: React.FormEvent,
        email?: string,
        password?: string
    ) => {
        e.preventDefault();
        const resolvedEmail = email ?? formData.email;
        const resolvedPassword = password ?? formData.password;
        const { user, error } = await signIn(resolvedEmail, resolvedPassword);

        if (error) { showErrorToast(error); return; }
        if (user) navigate(getRoleRoute(user.idRol), { replace: true });
    };

    const handleLogin = async (email: string, password: string) => {
        const { user, error } = await signIn(email, password);

        if (error) { showErrorToast(error); return; }
        if (user) navigate(getRoleRoute(user.idRol));
    };

    const signOut = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
        } finally {
            clearAuth();
            setUser(null);
        }
    };

    const handleRegister = async (formData: RegisterFormData) => {
        const { error } = await signUp(formData);
        if (!error) setIsLogin(true);
    };

    return {
        user,
        initializing,
        loading,
        formData,
        handleChange,
        handleSubmit,
        signIn,
        signOut,
        localError,
        error: localError || reduxError,
        isLogin,
        setIsLogin,
        handleRegister,
        handleLogin,
    };
};