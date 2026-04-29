import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/lib";
import { getProfileById, updateProfile } from "@/api";
import {
  apiToIProfile,
  mapFormToPayload,
  mapProfileToFormData,
} from "../mappers";
import {
  INITIAL_FORM,
  INITIAL_PROFILE,
  type ApiProfile,
  type IProfile,
  type ProfileFormData,
} from "../interfaces";
import type { AxiosError } from "axios";

export const useProfile = (userId?: number) => {
  const { toast } = useToast();

  const [profile, setProfile] = useState<IProfile>(INITIAL_PROFILE);
  const [backup, setBackup] = useState<IProfile>(INITIAL_PROFILE);
  const [form, setForm] = useState<ProfileFormData>(INITIAL_FORM);

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const loadProfile = useCallback(
    async (id?: number, signal?: AbortSignal) => {
      if (!id) return;

      try {
        setLoading(true);

        const data = (await getProfileById(id, { signal })) as ApiProfile;

        const normalized = apiToIProfile(data);
        const mappedForm = mapProfileToFormData(normalized);

        setForm(mappedForm);
        setProfile(normalized);
        setBackup(normalized);
      } catch (error: unknown) {
        const err = error as AxiosError;

        const isCanceled =
          err.code === "ERR_CANCELED" ||
          err.name === "CanceledError" ||
          (signal && signal.aborted);

        if (isCanceled) return;

        const status = err.response?.status;

        if (status === 401) return;

        console.error("Error loading profile:", err);

        toast({
          title: "Error",
          description: "No se pudo cargar el perfil",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();

    loadProfile(userId, controller.signal);

    return () => controller.abort();
  }, [userId, loadProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof IProfile;

    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCancel = () => {
    setProfile(backup);
    setForm(mapProfileToFormData(backup));
    setEditing(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!profile?.id) return;

    try {
      setLoading(true);

      const payload = mapFormToPayload(profile);

      await updateProfile(profile.id, payload);

      toast({
        title: "Éxito",
        description: "Perfil actualizado correctamente",
        variant: "success",
      });

      setEditing(false);
      setBackup(profile);
    } catch (error: unknown) {
      console.error("Error updating profile:", error);

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
    form,
    setForm,
    loading,
    editing,
    setEditing,
    handleChange,
    handleCancel,
    handleSubmit,
    loadProfile,
  };
};