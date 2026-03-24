import { useState, useEffect } from "react";
import type { AxiosError } from "axios";
import { getMalls } from "@/api";
import { extractApiErrorMessage, toast } from "@/lib";
import type { ApiErrorResponse, IMall } from "@/modules";

export const useMallReservation = () => {
  const [malls, setMalls] = useState<IMall[]>([]); 
  const [isLoading, setIsLoading] = useState(false);

  const fetchMalls = async () => {
    setIsLoading(true);
    try {
      const data = await getMalls();
      setMalls(data ?? []);
    } catch (error) {
      const description = extractApiErrorMessage(
        error as AxiosError<ApiErrorResponse>,
        "No se pudieron cargar los centros comerciales"
      );
      toast({ title: "Error", description, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMalls();
  }, []);

  return { malls, isLoading, fetchMalls };
};