import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { extractApiErrorMessage, toast, useFormData } from "@/lib";
import { INITIAL_DATA_COURTS, type ApiErrorResponseCourts, type CourtsFormData, type CreateCourtsDialogProps } from "../interfaces";
import { createCourts } from "@/api";
import { mapCreateCourtsFormToPayload } from "../mappers";

const getMallIdFromSession = (): string => {
  try {
    const raw = sessionStorage.getItem("user");
    if (!raw) return "";
    const user = JSON.parse(raw);
    return String(user?.mallId ?? "");
  } catch {
    return "";
  }
};
const PAGE_TITLE = "Gestión de Canchas - Play now";
const RELOAD_DELAY_MS = 800;

export const useCreateCourt = ({ onOpenChange }: CreateCourtsDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { formData: courtData, updateFormData } = useFormData<CourtsFormData>({
    ...INITIAL_DATA_COURTS,
    mallId: getMallIdFromSession(),
  });

  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  const handleChange = (
    field: keyof CourtsFormData,
    value: CourtsFormData[keyof CourtsFormData]
  ) => {
    updateFormData({ [field]: value } as Partial<CourtsFormData>);
  };
  const handleSuccess = () => {
    onOpenChange(false);
    setTimeout(() => {
      window.location.reload();
    }, RELOAD_DELAY_MS);
    toast({
      title: "Éxito",
      description: "Cancha creada correctamente",
      variant: "success",
    });
  };

  const handleError = (error: AxiosError<ApiErrorResponseCourts>) => {
    const description = extractApiErrorMessage(error, "Error al crear la cancha");
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
      const payload = mapCreateCourtsFormToPayload(courtData);
      await createCourts(payload);
      handleSuccess();
    } catch (error) {
      handleError(error as AxiosError<ApiErrorResponseCourts>);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    courtData,
    handleChange,
    handleSuccess,
    handleError,
    handleSubmit,
  };
};