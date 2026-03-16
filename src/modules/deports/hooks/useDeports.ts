import { useParams } from "react-router-dom";
import type { ApiErrorResponseDeports, DeportsData, IDeport } from "../interfaces";
import { useEffect, useState } from "react";
import { deleteDeport, getDeports, getDeportsById } from "@/api";
import { extractApiErrorMessage, toast } from "@/lib";
import type { AxiosError } from "axios";
import { mapDeportResponseToDeportData } from "../mappers";

export const useDeports = () => {
    const { id } = useParams();
    const [deports, setDeports] = useState<IDeport[]>([]);
    const [fetching, setFetching] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deport, setDeport] = useState<DeportsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDeports = async () => {
        setIsLoading(true);
        try {
            const data = await getDeports();
            setDeports(data);
        } catch (error) {
            console.error("Error fetching deports:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteDeport = async (deportId: number) => {
        setIsDeleting(true);
        try {
            await deleteDeport(deportId);
            setDeports((prev) => prev.filter((d) => d.id !== deportId));
            toast({
                title: "Eliminado",
                description: "Centro comercial eliminado correctamente",
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

    const fetchDeportsDetails = async () => {
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
    };

    useEffect(() => {
        fetchDeports();
    }, []);

    return {
        deports,
        fetching,
        isDeleting,
        deport,
        isLoading,
        fetchDeports,
        deleteDeport: handleDeleteDeport,
        fetchDeportsDetails,
        id,
        setFetching
    };
}