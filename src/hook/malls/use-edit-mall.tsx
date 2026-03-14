import { useEffect, useState } from "react";
import { useToast } from "../use-toast";
import type { IMall } from "../../types/mall";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface EditMallDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mall: IMall | null;
    onSuccess?: () => void;
}

export const useEditMall = ({ open, onOpenChange, mall, onSuccess }: EditMallDialogProps) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        nombreCentro: "",
        direccionMall: "",
        telefono: "",
        ciudad: "",
        tipoDocumento: "CC",
        numeroDocumento: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        correo: "",
        celular: "",
        direccionAdmin: "",
    });

    useEffect(() => {
        if (mall && open) {
            setForm({
                nombreCentro: mall.nombreCentro || "",
                direccionMall: mall.direccion || "",
                telefono: mall.telefono || "",
                ciudad: mall.ciudad || "",
                tipoDocumento: mall.administrador?.tipoDocumento || "CC",
                numeroDocumento: mall.administrador?.numeroDocumento || "",
                primerNombre: mall.administrador?.primerNombre || "",
                segundoNombre: mall.administrador?.segundoNombre || "",
                primerApellido: mall.administrador?.primerApellido || "",
                segundoApellido: mall.administrador?.segundoApellido || "",
                correo: mall.administrador?.correo || "",
                celular: mall.administrador?.celular || "",
                direccionAdmin: mall.administrador?.direccion || "",
            });
        }
    }, [mall, open]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mall?.id) return;

        const token = sessionStorage.getItem("token");
        if (!token) {
            toast({
                title: "Error",
                description: "No se encontró token de autenticación",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                mall: {
                    nombreCentro: form.nombreCentro,
                    direccion: form.direccionMall,
                    telefono: form.telefono,
                    ciudad: form.ciudad,
                },
                admin: {
                    tipoDocumento: form.tipoDocumento,
                    numeroDocumento: form.numeroDocumento,
                    primerNombre: form.primerNombre,
                    segundoNombre: form.segundoNombre,
                    primerApellido: form.primerApellido,
                    segundoApellido: form.segundoApellido,
                    correo: form.correo,
                    celular: form.celular,
                    direccion: form.direccionAdmin,
                },
            };

            await axios.put(`${API_URL}/malls/${mall.id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Éxito",
                description: "Centro comercial actualizado correctamente",
                variant: "success",
            });

            onSuccess?.();
            onOpenChange(false);
            setTimeout(() => {
                window.location.reload();
            }, 800);
        } catch (error: any) {
            console.error("Error actualizando mall:", error);
            toast({
                title: "Error",
                description: error?.response?.data?.message || "No se pudo actualizar el centro comercial",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { handleChange, handleSubmit, isLoading, form }
}