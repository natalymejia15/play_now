import { useState } from "react";
import axios from "axios";
import { toast } from "@/lib";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useCreateDeports = () => {
    const [isLoading, setIsLoading] = useState(false);
    const createDeports= async (payload: any) => {
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
            const { data } = await axios.post(`${API_URL}/sports`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Éxito",
                description: "Deporte creado correctamente",
                variant: "success",
            });

            return data;
        } catch (err: any) {
            toast({
                title: "Error",
                description: err?.response?.data?.message || "Error al crear el centro comercial",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return { createDeports, isLoading };
}