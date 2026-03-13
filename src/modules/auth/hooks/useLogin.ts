import { useAppDispatch, useAppSelector } from "@/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginData } from "../interfaces";
import { loginUser, logoutUser } from "@/features";
import axios from 'axios';
import type { RegisterFormData } from "@/interfaces/register.interfaces";
import { useRegister } from "@/hook/users/use-register";

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const { signUp } = useRegister();
    const navigate = useNavigate()
    const { token, loading, error } = useAppSelector(state => state.auth)
    const [user, setUser] = useState<any>(null)
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: '',
    })
    const [isLogin, setIsLogin] = useState(true);
    const [localError, setLocalError] = useState<string | null>(null)

    useEffect(() => {
        if (token) {
            navigate('/', { replace: true })
        }
        const stored = localStorage.getItem('user')
        if (stored) {
            try {
                setUser(JSON.parse(stored))
            } catch (e) {
                setUser(null)
            }
        }
    }, [token, navigate])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLocalError(null)

        try {
            const result = await dispatch(loginUser(formData)).unwrap()
            const access = (result as any).accessToken || (result as any).token
            const user = (result as any).user || null

            if (access) {
                localStorage.setItem('token', access)
                if (user) localStorage.setItem('user', JSON.stringify(user))
                axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
                if (user && user.idRol) {
                    switch (user.idRol) {
                        case 1:
                            navigate('/super-admin/dashboard', { replace: true })
                            break
                        case 2:
                            navigate('/admin/dashboard', { replace: true })
                            break
                        case 3:
                            navigate('/client/home', { replace: true })
                            break
                        default:
                            navigate('/dashboard', { replace: true })
                            break
                    }
                } else {
                    navigate('/dashboard', { replace: true })
                }
            } else {
                setLocalError('Respuesta de login inesperada')
            }
        } catch (err) {
            console.error('Error login:', err)
            setLocalError((err as string) || 'Error al iniciar sesión')
        }
    }
    const signIn = async (email: string, password: string) => {
        setLocalError(null)
        try {
            const result = await dispatch(loginUser({ email, password })).unwrap()
            const access = (result as any).accessToken || (result as any).token
            const user = (result as any).user || null

            if (access) {
                localStorage.setItem('token', access)
                if (user) localStorage.setItem('user', JSON.stringify(user))
                axios.defaults.headers.common['Authorization'] = `Bearer ${access}`

                // update local user state
                if (user) setUser(user)

                return { user, error: null as string | null }
            }

            const msg = 'Respuesta de login inesperada'
            setLocalError(msg)
            return { user: null, error: msg }
        } catch (err: any) {
            const message = err ?? 'Error al iniciar sesión'
            setLocalError(message)
            return { user: null, error: message }
        }
    }

    const signOut = async () => {
        try {
            await dispatch((logoutUser as any)()).unwrap()
        } catch (e) {
            // ignore
        } finally {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['Authorization']
            setUser(null)
        }
    }

    const handleLogin = async (email: string, password: string) => {
        const { user, error } = await signIn(email, password);

        if (!error && user) {
            switch (user.idRol) {
                case 1:
                    navigate("/super-admin/dashboard");
                    break;
                case 2:
                    navigate("/admin/dashboard");
                    break;
                case 3:
                    navigate("/client/home");
                    break;
                default:
                    navigate("/");
                    break;
            }
        }
    };

    const handleRegister = async (formData: RegisterFormData) => {
        const { error } = await signUp(formData);
        if (!error) {
            setIsLogin(true);
        }
    };

    return {
        user,
        loading,
        handleChange,
        handleSubmit,
        signIn,
        signOut,
        localError,
        error: localError || error,
        isLogin,
        setIsLogin,
        handleRegister,
        handleLogin
    };
}