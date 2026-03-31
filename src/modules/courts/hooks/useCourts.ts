import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { ApiErrorResponseCourts, CourtsData, ICourts } from "../interfaces";
import { deleteCourts, getCourts, getCourtsById } from "@/api";
import { extractApiErrorMessage, toast } from "@/lib";
import type { AxiosError } from "axios";
import { mapCourtsResponseToCourtsData } from "../mappers";

export const useCourts = () => {
    const { id: paramId } = useParams();
    const location = useLocation();
    const state = (location.state || {}) as { id?: number | string };
    const id = paramId ?? (state?.id !== undefined ? String(state.id) : undefined);
    const [courts, setCourts] = useState<ICourts[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [court, setCourt] = useState<CourtsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCourts = async () => {
        setIsLoading(true);
        try {
            const data = await getCourts();
            setCourts(data ?? []);
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseCourts>,
                "No se pudieron cargar las canchas"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteCourts = async (courtId: number) => {
        setIsDeleting(true);
        try {
            await deleteCourts(courtId);
            setCourts((prev) => prev.filter((d) => d.id !== courtId));
            toast({
                title: "Eliminado",
                description: "Cancha eliminada correctamente",
                variant: "success",
            });
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseCourts>,
                "No se pudo eliminar el deporte"
            );
            toast({ title: "Error al eliminar", description, variant: "destructive" });
        } finally {
            setIsDeleting(false);
        }
    };

    const fetchCourtsDetails = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const data = await getCourtsById(Number(id));
            setCourt(mapCourtsResponseToCourtsData(data));
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseCourts>,
                "No se pudieron cargar los detalles de la cancha"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourts();
    }, []);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
        }
    }, [id]);

    return {
        court,
        courts,
        isDeleting,
        isLoading,
        fetchCourts,
        handleDeleteCourts,
        fetchCourtsDetails,
        id,
        deleteCourts
    }
}