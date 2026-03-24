import { useState } from "react";
import type { Court, CourtData } from "../../types/courts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useToast } from "@/lib";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
export const useCourt = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [fetching, setFetching] = useState(false);
    const { id } = useParams();
    const [court, setCourt] = useState<CourtData | null>(null);
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const token = sessionStorage.getItem("token");
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

    const editCourt = async (id: number, values: any) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (value instanceof File || value instanceof Blob) {
                        formData.append(key, value);
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });


            await axios.put(`${API_URL}/courts/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast({ title: "Éxito", description: "Cancha actualizada correctamente" });
            await fetchCourts();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "No se pudo actualizar la cancha",
            });
        } finally {
            setIsLoading(false);
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
    const fetchCourtsByMall = async (mallId: string) => {
         if (!token) return;
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${API_URL}/courts/mall/${mallId}`);
            setCourts(data);
        } catch (error) {
            console.error("Error al cargar canchas:", error);
            toast({
                title: "Error",
                description: "No se pudieron cargar las canchas.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCourtsDetails = async () => {
        if (!id) return;
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${API_URL}/courts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const mappedCourt: CourtData = {
                id: data.id,
                nombreCancha: data.nombreCancha,
                horarioInicio: data.horarioInicio,
                horarioFin: data.horarioFin,
                diasDisponibles: data.diasDisponibles,
                valorHora: data.valorHora,
                telefono: data.telefono,
                direccion: data.direccion,
                responsable: data.responsable,
                detalles: data.detalles,
                capacidad: data.capacidad,
                imagen: data.imagen
            };

            setCourt(mappedCourt);
        } catch (error) {
            console.error("Error fetching court details:", error);
            toast({
                title: "Error",
                description: "No se pudieron obtener los detalles de la cancha.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        courts,
        loading,
        fetchCourts,
        deleteCourts,
        fetching,
        isDeleting,
        editCourt,
        isLoading,
        fetchCourtsDetails,
        id,
        court,
        API_URL,
        fetchCourtsByMall
    }
}