import { useState } from "react";
import type { Court } from "../../types/courts";
import { useToast } from "../use-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useCourt = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [fetching, setFetching] = useState(false);
    const { toast } = useToast();

    const token = localStorage.getItem("token");
    const fetchCourts = async () => {
        if (!token) {
            toast({
                title: "Error",
                description: "No se encontró token de autenticación",
                variant: "destructive",
            });
            return;
        }
        setFetching(true);
        try {
            const response = await axios.get(`${API_URL}/courts`);
            setCourts(response.data);
        } catch (error) {
            toast({
                title: "Error al cargar las canchas",
                description: "No se pudieron obtener los datos del servidor.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteCourts = async (mallId: number) => {
        if (!token) return;
        setIsDeleting(true);
        try {
            await axios.delete(`${API_URL}/courts/${mallId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Eliminada",
                description: "La cancha ha sido eliminada correctamente",
                variant: "success",
            });

            setCourts((prev) => prev.filter((mall) => mall.id !== mallId));
        } catch (error: any) {
            toast({
                title: "Error al eliminar",
                description: error?.response?.data?.message || "No se pudo eliminar la cancha",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };
    return {
        courts,
        loading,
        fetchCourts,
        deleteCourts,
        fetching,
        isDeleting
    }
}