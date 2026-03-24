import { useEffect, useState } from "react";
import { INITIAL_DATA_DEPORTS, type ApiErrorResponseDeports, type CreateDeportsDialogProps, type DeportsFormData } from "../interfaces";
import { extractApiErrorMessage, toast, useFormData } from "@/lib";
import type { AxiosError } from "axios";
import { mapCreateDeportsFormToPayload } from "../mappers";
import { createDeports } from "@/api";

const PAGE_TITLE = "Gestión de Deportes - Play now";
const RELOAD_DELAY_MS = 800;

export const useCreateDeports = ({ onOpenChange }: CreateDeportsDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { formData: deportsData, updateFormData } =
        useFormData<DeportsFormData>(INITIAL_DATA_DEPORTS);

    useEffect(() => {
        document.title = PAGE_TITLE;
    }, []);

    const handleChange = (field: keyof DeportsFormData, value: string) => {
        updateFormData({ [field]: value } as Partial<DeportsFormData>);
    };

    const handleSuccess = () => {
        onOpenChange(false);
        setTimeout(() => {
            window.location.reload();
        }, RELOAD_DELAY_MS);
        toast({
            title: "Éxito",
            description: "Deporte creado correctamente",
            variant: "success",
        });
    };

    const handleError = (error: AxiosError<ApiErrorResponseDeports>) => {
        const description = extractApiErrorMessage(
            error,
            "Error al crear el deporte"
        );
        toast({
            title: "Error",
            description,
            variant: "destructive",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload = mapCreateDeportsFormToPayload(deportsData);
            await createDeports(payload);
            handleSuccess();
        } catch (error) {
            handleError(error as AxiosError<ApiErrorResponseDeports>);
        } finally {
            setIsLoading(false);
        }
    };
    return {
        isLoading,
        deportsData,
        handleChange,
        handleSuccess,
        handleError,
        handleSubmit,
    };
};