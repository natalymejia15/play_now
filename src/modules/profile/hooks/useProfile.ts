import { useState, useEffect } from "react";
import { useToast } from "@/lib";
import { getProfileById, updateProfile } from "@/api";
import { apiToIProfile, mapFormToPayload, mapProfileToFormData } from "../mappers";
import { INITIAL_FORM, INITIAL_PROFILE, type ApiProfile, type IProfile, type ProfileFormData } from "../interfaces";

export const useProfile = (userId?: number) => {
     const { toast } = useToast();

     const [profile, setProfile] = useState<IProfile>(INITIAL_PROFILE);
     const [backup, setBackup] = useState<IProfile>(INITIAL_PROFILE);
     const [form, setForm] = useState<ProfileFormData>(INITIAL_FORM);

     const [loading, setLoading] = useState(false);
     const [editing, setEditing] = useState(false);

     useEffect(() => {
          if (!userId) return;

          const controller = new AbortController();
          // call loadProfile with abort signal and clean up on userId change / unmount
          loadProfile(userId, controller.signal);

          return () => controller.abort();
     }, [userId]);

     const loadProfile = async (id?: number, signal?: AbortSignal) => {
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
               console.error("Error loading profile:", error);

               // If the request was aborted (e.g. logout or userId change), don't show an error toast
               const anyErr = error as any;
               const isCanceled = anyErr?.code === "ERR_CANCELED" || anyErr?.name === "CanceledError" || (signal && signal.aborted);
               const status = anyErr?.response?.status;
               if (isCanceled || status === 401) {
                    // silently ignore cancellations and unauthorized errors (likely caused by logout)
                    return;
               }

               toast({
                    title: "Error",
                    description: "No se pudo cargar el perfil",
                    variant: "destructive",
               });
          } finally {
               setLoading(false);
          }
     };

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
