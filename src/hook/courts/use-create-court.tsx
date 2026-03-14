import { useState } from "react";
import axios from "axios";
import { toast } from "../use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useCreateCourt = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createCourt = async (formData: FormData) => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast({
                title: "Error",
                description: "No se encontró token de autenticación",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/courts`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: "Éxito",
                description: "Cancha creada correctamente",
                variant: "success",
            });

            return data;
        } catch (error: any) {
            toast({
                title: "Error al crear la cancha",
                description: error.response?.data?.message || "Error inesperado",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { createCourt, isLoading };
};
