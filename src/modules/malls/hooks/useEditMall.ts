import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { updateMall } from "@/api";
import type { ApiErrorResponseMalls, EditMallDialogProps, EditMallFormData } from "../interfaces";
import { extractApiErrorMessage, toast } from "@/lib";
import { INITIAL_EDIT_MALL_FORM, mapEditMallFormToPayload, mapMallToEditForm } from "../mappers";

const RELOAD_DELAY_MS = 800;

export const useEditMall = ({ open, onOpenChange, mall, onSuccess }: EditMallDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<EditMallFormData>(INITIAL_EDIT_MALL_FORM);

    useEffect(() => {
        if (mall && open) {
            setForm(mapMallToEditForm(mall));
        }
    }, [mall, open]);

    const handleChange = (field: keyof EditMallFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSuccess = () => {
        toast({
            title: "Éxito",
            description: "Centro comercial actualizado correctamente",
            variant: "success",
        });

        onSuccess?.();
        onOpenChange(false);

        setTimeout(() => {
            window.location.reload();
        }, RELOAD_DELAY_MS);
    };

    const handleError = (error: AxiosError<ApiErrorResponseMalls>) => {
        const description = extractApiErrorMessage(
            error,
            "No se pudo actualizar el centro comercial"
        );

        toast({
            title: "Error",
            description,
            variant: "destructive",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mall?.id) return;

        setIsLoading(true);

        try {
            const payload = mapEditMallFormToPayload(form);
            await updateMall(mall.id, payload);
            handleSuccess();
        } catch (error) {
            handleError(error as AxiosError<ApiErrorResponseMalls>);
        } finally {
            setIsLoading(false);
        }
    };

    return { form, isLoading, handleChange, handleSubmit };
};