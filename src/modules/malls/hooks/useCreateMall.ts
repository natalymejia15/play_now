import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { createMall } from "@/api";
import { extractApiErrorMessage, toast, useFormData } from "@/lib";
import { INITIAL_DATA_USER, type UserFormData } from "@/interfaces";
import type { ApiErrorResponseMalls, CreateMallDialogProps } from "../interfaces";
import { mapCreateMallFormToPayload } from "../mappers";

const PAGE_TITLE = "Gestión de Centros Comerciales - Play now";
const RELOAD_DELAY_MS = 800;

export const useCreateMall = ({ onOpenChange }: CreateMallDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { formData: mallData, updateFormData } =
        useFormData<UserFormData>(INITIAL_DATA_USER);

    useEffect(() => {
        document.title = PAGE_TITLE;
    }, []);

    const handleChange = (field: keyof UserFormData, value: string) => {
        updateFormData({ [field]: value } as Partial<UserFormData>);
    };

    const handleSuccess = () => {
        onOpenChange(false);
        setTimeout(() => {
            window.location.reload();
        }, RELOAD_DELAY_MS);
        toast({
            title: "Éxito",
            description: "Centro comercial creado correctamente",
            variant: "success",
        });
    };

    const handleError = (error: AxiosError<ApiErrorResponseMalls>) => {
        const description = extractApiErrorMessage(
            error,
            "Error al crear el centro comercial"
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
            const payload = mapCreateMallFormToPayload(mallData);
            await createMall(payload);
            handleSuccess();
        } catch (error) {
            handleError(error as AxiosError<ApiErrorResponseMalls>);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, mallData, handleSubmit, handleChange };
};