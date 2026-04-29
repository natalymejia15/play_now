import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { updateDeports } from "@/api";
import { extractApiErrorMessage, toast } from "@/lib";
import type { ApiErrorResponseDeports, EditDeportsDialogProps, EditDeportsFormData } from "../interfaces";
import { INITIAL_EDIT_DEPORTS_FORM, mapDeportsToEditForm, mapEditDeportsFormToPayload } from "../mappers";

const RELOAD_DELAY_MS = 800;

export const useEditDeports = ({ open, onOpenChange, deport, onSuccess }: EditDeportsDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<EditDeportsFormData>(INITIAL_EDIT_DEPORTS_FORM);

    useEffect(() => {
        if (deport && open) {
            setForm(mapDeportsToEditForm(deport));
        }
    }, [deport, open]);

    const handleChange = (field: keyof EditDeportsFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSuccess = () => {
        toast({
            title: "Éxito",
            description: "Deporte actualizado correctamente",
            variant: "success",
        });

        onSuccess?.();
        onOpenChange(false);

        setTimeout(() => {
            window.location.reload();
        }, RELOAD_DELAY_MS);
    };

    const handleError = (error: AxiosError<ApiErrorResponseDeports>) => {
        const description = extractApiErrorMessage(
            error,
            "No se pudo actualizar el deporte"
        );

        toast({
            title: "Error",
            description,
            variant: "destructive",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deport?.id) return;

        setIsLoading(true);

        try {
            const payload = mapEditDeportsFormToPayload(form);
            await updateDeports(deport.id, payload);
            handleSuccess();
        } catch (error) {
            handleError(error as AxiosError<ApiErrorResponseDeports>);
        } finally {
            setIsLoading(false);
        }
    };

    return { form, isLoading, handleChange, handleSubmit };
};