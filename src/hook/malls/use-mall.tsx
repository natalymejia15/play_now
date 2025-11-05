import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "../../hook/use-toast";
import type { AdminData, IMall, MallData } from "../../types/mall";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const useMalls = () => {
  const [malls, setMalls] = useState<IMall[]>([]);
  const [fetching, setFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const [mall, setMall] = useState<MallData | null>(null);
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const fetchMalls = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "No se encontró token de autenticación",
        variant: "destructive",
      });
      return;
    }

    setFetching(true);
    try {
      const { data } = await axios.get(`${API_URL}/malls`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMalls(data || []);
    } catch (error: any) {
      console.error("Error fetching malls:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudieron cargar los centros comerciales",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  const deleteMall = async (mallId: number) => {
    if (!token) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/malls/${mallId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Eliminado",
        description: "Centro comercial eliminado correctamente",
        variant: "success",
      });

      setMalls((prev) => prev.filter((mall) => mall.id !== mallId));
    } catch (error: any) {
      toast({
        title: "Error al eliminar",
        description: error?.response?.data?.message || "No se pudo eliminar el centro comercial",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };


  const fetchMallDetails = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/malls/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mappedMall: MallData = {
        id: data.id,
        nombre_centro: data.nombreCentro,
        direccion: data.direccion,
        telefono: data.telefono,
        ciudad: data.ciudad,
        created_at: data.createdAt,
      };

      const mappedAdmin: AdminData | null = data.administrador
        ? {
          id: data.administrador.id,
          first_name: data.administrador.primerNombre,
          segundo_nombre: data.administrador.segundoNombre,
          last_name: data.administrador.primerApellido,
          segundo_apellido: data.administrador.segundoApellido,
          email: data.administrador.correo,
          phone_number: data.administrador.celular,
          document_type: "",
          document_number: "",
          address: "",
        }
        : null;

      setMall(mappedMall);
      setAdmin(mappedAdmin);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      cedula: "Cédula de Ciudadanía",
      nit: "NIT",
      pasaporte: "Pasaporte",
      tarjeta_identidad: "Tarjeta de Identidad"
    };
    return types[type] || type;
  };

  useEffect(() => {
    fetchMalls();
  }, []);

  return {
    malls,
    fetching,
    fetchMalls,
    deleteMall,
    isDeleting,
    fetchMallDetails,
    getDocumentTypeLabel,
    mall,
    admin,
    isLoading,
    id
  };
};
