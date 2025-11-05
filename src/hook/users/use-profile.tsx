import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../use-toast";

const API_URL = "http://localhost:4000/api/users";

export const useProfile = (userId?: number) => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    segundo_nombre: "",
    last_name: "",
    segundo_apellido: "",
    document_type: "",
    document_number: "",
    birth_date: "",
    phone_number: "",
    address: "",
    business_name: "",
  });

  const [backup, setBackup] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (userId) loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/${userId}`);
      const mappedData = {
        email: data.correo || "",
        first_name: data.primerNombre || "",
        segundo_nombre: data.segundoNombre || "",
        last_name: data.primerApellido || "",
        segundo_apellido: data.segundoApellido || "",
        document_type: data.tipoDocumento || "",
        document_number: data.numeroDocumento || "",
        birth_date: data.birth_date || "",
        phone_number: data.celular || "",
        address: data.direccion || "",
        business_name: data.razonSocial || "",
      };

      setProfile(mappedData);
      setBackup(mappedData);
    } catch (error: any) {
      console.error("Error al cargar perfil:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar el perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setProfile(backup);
    setEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        correo: profile.email,
        primerNombre: profile.first_name,
        segundoNombre: profile.segundo_nombre,
        primerApellido: profile.last_name,
        segundoApellido: profile.segundo_apellido,
        tipoDocumento: profile.document_type,
        numeroDocumento: profile.document_number,
        celular: profile.phone_number,
        direccion: profile.address,
        razonSocial: profile.business_name,
      };

      await axios.put(`${API_URL}/${userId}`, payload);

      toast({
        title: "Éxito",
        description: "Perfil actualizado correctamente",
        variant:"success"
      });
      setEditing(false);
      setBackup(profile);
    } catch (error: any) {
      console.error("Error al actualizar perfil:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    setProfile,
    loading,
    editing,
    setEditing,
    handleChange,
    handleCancel,
    handleSubmit,
    loadProfile,
  };
};
