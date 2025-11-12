import { useEffect, useState } from "react";
import { toast } from "../use-toast";
import axios from "axios";
import type { EditCourtDialogProps } from "../../types/courts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";


export const useEditCourts = ({
    onOpenChange,
    court,
    refreshCourts, }: EditCourtDialogProps) => {
    const [formData, setFormData] = useState({
        nombreCancha: "",
        horarioInicio: "",
        horarioFin: "",
        diasDisponibles: [] as string[],
        valorHora: "",
        telefono: "",
        direccion: "",
        responsable: "",
        detalles: "",
        capacidad: "",
    });
    const [imagen, setImagen] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const diasSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    useEffect(() => {
        if (court) {
            setFormData({
                nombreCancha: court.nombreCancha,
                horarioInicio: court.horarioInicio,
                horarioFin: court.horarioFin,
                diasDisponibles: court.diasDisponibles
                    ? court.diasDisponibles.split(",")
                    : [],
                valorHora: court.valorHora.toString(),
                telefono: court.telefono,
                direccion: court.direccion,
                responsable: court.responsable,
                detalles: court.detalles || "",
                capacidad: court.capacidad.toString(),
            });
        }
    }, [court]);

    const toggleDia = (dia: string) => {
        setFormData((prev) => ({
            ...prev,
            diasDisponibles: prev.diasDisponibles.includes(dia)
                ? prev.diasDisponibles.filter((d) => d !== dia)
                : [...prev.diasDisponibles, dia],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!court) return;

        setIsLoading(true);
        const token = localStorage.getItem("token");

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "diasDisponibles") {
                    data.append(key, (value as string[]).join(","));
                } else {
                    data.append(key, value as string);
                }
            });
            if (imagen) data.append("imagen", imagen);

            await axios.put(`${API_URL}/courts/${court.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast({
                title: "Actualizada",
                description: "La cancha se actualizó correctamente.",
                variant: "success",
            });

            refreshCourts();
            onOpenChange(false);
        } catch (error: any) {
            toast({
                title: "Error al actualizar",
                description: error?.response?.data?.message || "No se pudo actualizar la cancha",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {handleSubmit,setImagen,toggleDia, diasSemana,isLoading, setFormData,formData, API_URL }
}