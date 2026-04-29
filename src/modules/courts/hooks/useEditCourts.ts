import { useEffect, useState } from "react";
import type { ApiErrorResponseCourts, EditCourtsDialogProps, EditCourtsFormData, CourtsFormValue } from "../interfaces";
import { INITIAL_EDIT_COURT_FORM, mapCourtsToEditForm, mapEditCourtsFormToPayload } from "../mappers";
import { extractApiErrorMessage, toast } from "@/lib";
import type { AxiosError } from "axios";
import { updateCourts } from "@/api";

const RELOAD_DELAY_MS = 800;

export const useEditCourts = ({ open, onOpenChange, court, onSuccess }: EditCourtsDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState<EditCourtsFormData>(INITIAL_EDIT_COURT_FORM);

    useEffect(() => {
        if (court && open) {
            setForm(mapCourtsToEditForm(court));
        }
    }, [court, open]);
    const handleChange = (field: keyof EditCourtsFormData, value: CourtsFormValue) => {
        setForm((prev) => ({ ...prev, [field]: value as unknown as EditCourtsFormData[keyof EditCourtsFormData] }));
    };

    const handleSuccess = () => {
        toast({
            title: "Éxito",
            description: "Cancha actualizada correctamente",
            variant: "success",
        });

        onSuccess?.();
        onOpenChange(false);

        setTimeout(() => {
            window.location.reload();
        }, RELOAD_DELAY_MS);
    };

    const handleError = (error: AxiosError<ApiErrorResponseCourts>) => {
        const description = extractApiErrorMessage(
            error,
            "No se pudo actualizar la cancha"
        );

        toast({
            title: "Error",
            description,
            variant: "destructive",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!court?.id) return;

        setIsLoading(true);

        try {
            const payload = mapEditCourtsFormToPayload(form);
            await updateCourts(court.id, payload);
            handleSuccess();
        } catch (error) {
            handleError(error as AxiosError<ApiErrorResponseCourts>);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoading,
        handleChange,
        handleSubmit
    }
}
