import {  getDeportsActive } from "@/api";
import type { IDeport } from "@/modules/deports";
import { useEffect, useMemo, useState } from "react";
import type { CourtsFormData, } from "../interfaces";

type Props = {
    values: CourtsFormData,
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useImageCourts = ({ values }: Props) => {
    const [deports, setDeports] = useState<IDeport[]>([]);
    const [deportsLoading, setDeportsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {

        if (typeof values.imagen === "string") {
            const img = values.imagen as string;
            const url = img.startsWith("http") ? img : `${API_URL}/uploads/${encodeURIComponent(img)}`;
            setPreviewUrl(url);
            return;
        }
        if (values.imagen instanceof File) {
            const url = URL.createObjectURL(values.imagen);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
        setPreviewUrl(null);
    }, [values.imagen]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setDeportsLoading(true);
            try {
                const data = await getDeportsActive();
                if (mounted) setDeports(data);
            } catch {
                if (mounted) setDeports([]);
            } finally {
                if (mounted) setDeportsLoading(false);
            }
        };
        load();
        return () => { mounted = false };
    }, []);

    return {
        deports,
        deportsLoading,
        previewUrl
    }
}

type PropsImagen = {
    imagen?: string | null;
};

export const useCourtImage = ({ imagen }: PropsImagen) => {
    const imageUrl = useMemo(() => {
        if (!imagen) return null;

        if (imagen.startsWith("http")) {
            return imagen;
        }

        return `${API_URL}/uploads/${encodeURIComponent(imagen)}`;
    }, [imagen]);

    return { imageUrl };
};