import { useState } from "react";
import { useCreateCourt } from "../courts/use-create-court";
import type { CreateCourtDialogProps } from "../../types/dialog";
import { toast } from "@/lib";

export const UseFormAdmin = ({ open, onOpenChange }: CreateCourtDialogProps) => {
    const [nombreCancha, setNombreCancha] = useState("");
    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFin, setHorarioFin] = useState("");
    const [diasDisponibles, setDiasDisponibles] = useState<string[]>([]);
    const [valorHora, setValorHora] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [responsable, setResponsable] = useState("");
    const [detalles, setDetalles] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [imagen, setImagen] = useState<File | null>(null);

    const { createCourt, isLoading } = useCreateCourt();

    const diasSemana = [
        "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
    ];

    const toggleDia = (dia: string) => {
        setDiasDisponibles((prev) =>
            prev.includes(dia)
                ? prev.filter((d) => d !== dia)
                : [...prev, dia]
        );
    };

    const resetForm = () => {
        setNombreCancha("");
        setHorarioInicio("");
        setHorarioFin("");
        setDiasDisponibles([]);
        setValorHora("");
        setTelefono("");
        setDireccion("");
        setResponsable("");
        setDetalles("");
        setCapacidad("");
        setImagen(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        if (!user?.mallId) {
            toast({
                title: "Error",
                description: "No se encontró el centro comercial asociado al usuario.",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append("nombreCancha", nombreCancha);
        formData.append("horarioInicio", horarioInicio);
        formData.append("horarioFin", horarioFin);
        formData.append("diasDisponibles", diasDisponibles.join(","));
        formData.append("valorHora", valorHora);
        formData.append("telefono", telefono);
        formData.append("direccion", direccion);
        formData.append("responsable", responsable);
        formData.append("detalles", detalles);
        formData.append("capacidad", capacidad);
        formData.append("mallId", user.mallId);
        if (imagen) formData.append("imagen", imagen);

        try {
            await createCourt(formData);
            resetForm();
            onOpenChange(false);
            setTimeout(() => window.location.reload(), 800);
        } catch (error) {
            console.error("Error creando cancha:", error);
        }
    };

    return {
        capacidad,
        detalles,
        isLoading,
        diasSemana,
        toggleDia,
        handleSubmit,
        horarioFin,
        horarioInicio,
        nombreCancha,
        telefono,
        setHorarioFin,
        setHorarioInicio,
        setNombreCancha,
        setTelefono,
        setDireccion,
        direccion,
        diasDisponibles,
        valorHora,
        setValorHora,
        setCapacidad,
        responsable,
        setDetalles,
        setResponsable,
        setImagen
    }
}