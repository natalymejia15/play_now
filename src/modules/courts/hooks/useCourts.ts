import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { ApiErrorResponseCourts, CourtsData, ICourts } from "../interfaces";
import { deleteCourts, getCourts, getCourtsById, getCourtsByIdMalls, updateStatusCourt } from "@/api";
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
            const prepared = (data ?? []).map((d) => ({
                ...d,
                deporteNombre: d.deporte?.nombre ?? null,
                cantidadCancha: d.deporte?.cantidad ?? null,
            }));
            setCourts(prepared);
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

    const fetchCourtsDetails = useCallback(async () => {
        if (!id) return;

        setIsLoading(true);
        try {
            const data = await getCourtsById(Number(id));
            const mapped = mapCourtsResponseToCourtsData(data);
            setCourt(mapped);
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseCourts>,
                "No se pudieron cargar los detalles de la cancha"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const fetchCourtsByMall = async (mallId: string) => {
        if (!mallId) return;
        setIsLoading(true);
        try {
            const data = await getCourtsByIdMalls(Number(mallId));
            const prepared = (data ?? []).map((d) => ({
                ...d,
                deporteNombre: d.deporte?.nombre ?? null,
                cantidadCancha: d.deporte?.cantidad ?? null,
            }));
            setCourts(prepared);
            setCourt(null);
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseCourts>,
                "No se pudieron cargar las canchas del centro comercial"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }


    const updateStatusCourts = async (courtId: number, activo: boolean) => {
        try {
            await updateStatusCourt(courtId, { activo });
            setCourts((prev) => prev.map((c) => (c.id === courtId ? { ...c, activo } : c)));
            toast({ title: "Actualizado", description: "Estado actualizado", variant: "success" });
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseCourts>,
                "No se pudo actualizar el estado"
            );
            toast({ title: "Error", description, variant: "destructive" });
            throw error;
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
        deleteCourts,
        fetchCourtsByMall,
        updateStatusCourts
    }
}