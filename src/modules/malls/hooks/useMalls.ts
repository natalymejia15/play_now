import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import type { AxiosError } from "axios";
import { getMalls, getMallById, deleteMall as deleteMallApi } from "@/api";
import { extractApiErrorMessage, toast } from "@/lib";
import {
    mapMallResponseToAdminData,
    mapMallResponseToMallData,
} from "../mappers";
import { DOCUMENT_TYPE_LABELS } from "@/constants";
import type { AdminData, ApiErrorResponseMalls, IMall, MallData } from "../interfaces";

export const useMalls = () => {
    const { id: paramId } = useParams();
    const location = useLocation();
    const state = (location.state || {}) as { id?: number | string };
    const id = paramId ?? (state?.id !== undefined ? String(state.id) : undefined);
    const [malls, setMalls] = useState<IMall[]>([]);
    const [fetching, setFetching] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mall, setMall] = useState<MallData | null>(null);
    const [admin, setAdmin] = useState<AdminData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMalls = async () => {
        setFetching(true);
        try {
            const data = await getMalls();
            setMalls(data ?? []);
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseMalls>,
                "No se pudieron cargar los centros comerciales"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setFetching(false);
        }
    };

    const handleDeleteMall = async (mallId: number) => {
        setIsDeleting(true);
        try {
            await deleteMallApi(mallId);
            setMalls((prev) => prev.filter((m) => m.id !== mallId));
            toast({
                title: "Eliminado",
                description: "Centro comercial eliminado correctamente",
                variant: "success",
            });
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseMalls>,
                "No se pudo eliminar el centro comercial"
            );
            toast({ title: "Error al eliminar", description, variant: "destructive" });
        } finally {
            setIsDeleting(false);
        }
    };

    const fetchMallDetails = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const data = await getMallById(Number(id));
            setMall(mapMallResponseToMallData(data));
            setAdmin(mapMallResponseToAdminData(data));
        } catch (error) {
            const description = extractApiErrorMessage(
                error as AxiosError<ApiErrorResponseMalls>,
                "No se pudieron cargar los detalles del centro comercial"
            );
            toast({ title: "Error", description, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const getDocumentTypeLabel = (type: string): string =>
        DOCUMENT_TYPE_LABELS[type] ?? type;

    useEffect(() => {
        fetchMalls();
    }, []);
    useEffect(() => {
        if (!id) {
            setIsLoading(false);
        }
    }, [id]);

    return {
        malls,
        fetching,
        fetchMalls,
        deleteMall: handleDeleteMall,
        isDeleting,
        fetchMallDetails,
        getDocumentTypeLabel,
        mall,
        admin,
        isLoading,
        id,
    };
};