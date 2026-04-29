import { useParams, useLocation } from "react-router-dom";
import type { ApiErrorResponseDeports, DeportsData, IDeport } from "../interfaces";
import { useCallback, useEffect, useState } from "react";
import { deleteDeport, getDeports, getDeportsById, updateStatusDeports } from "@/api";
import { extractApiErrorMessage, toast } from "@/lib";
import type { AxiosError } from "axios";
import { mapDeportResponseToDeportData } from "../mappers";

export const useDeports = () => {
    const { id: paramId } = useParams();
    const location = useLocation();
    const state = (location.state || {}) as { id?: number | string };
    const id = paramId ?? (state?.id !== undefined ? String(state.id) : undefined);
    const [deports, setDeports] = useState<IDeport[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deport, setDeport] = useState<DeportsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDeports = async () => {
        setIsLoading(true);
        try {
            const data = await getDeports();
            setDeports(data ?? []);
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseDeports>,
                "No se pudieron cargar los deportes"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatusDeport = async (deportId: number, activo: boolean) => {
        try {
            await updateStatusDeports(deportId, { activo });
            setDeports((prev) => prev.map((d) => (d.id === deportId ? { ...d, activo } : d)));
            toast({ title: "Actualizado", description: "Estado actualizado", variant: "success" });
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseDeports>,
                "No se pudo actualizar el estado"
            );
            toast({ title: "Error", description, variant: "destructive" });
            throw error;
        }
    };

    const handleDeleteDeport = async (deportId: number) => {
        setIsDeleting(true);
        try {
            await deleteDeport(deportId);
            setDeports((prev) => prev.filter((d) => d.id !== deportId));
            toast({
                title: "Eliminado",
                description: "Deporte eliminado correctamente",
                variant: "success",
            });
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseDeports>,
                "No se pudo eliminar el deporte"
            );
            toast({ title: "Error al eliminar", description, variant: "destructive" });
        } finally {
            setIsDeleting(false);
        }
    };

    const fetchDeportsDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const data = await getDeportsById(Number(id));
            setDeport(mapDeportResponseToDeportData(data));
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseDeports>,
                "No se pudieron cargar los detalles del deporte"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDeports();
    }, []);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
        }
    }, [id]);

    return {
        deports,
        isDeleting,
        deport,
        isLoading,
        fetchDeports,
        deleteDeport: handleDeleteDeport,
        updateStatusDeport,
        fetchDeportsDetails,
        id,
    };
}