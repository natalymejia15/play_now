import { useState } from "react";
import type { ICreateContactRequest } from "@/interfaces";
import { useToast } from "@/lib";
import { createContact } from "@/api";

const initialForm: ICreateContactRequest = {
  nombre: "",
  email: "",
  tipo: "",
  mensaje: "",
};

export const useCreateContact = () => {
  const { toast } = useToast();

  const [form, setForm] = useState<ICreateContactRequest>(initialForm);

  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createContact(form);

      setSubmitted(true);

      setForm(initialForm);

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "No fue posible enviar el mensaje.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);

    setForm(initialForm);
  };

  return {
    form,
    loading,
    submitted,
    handleChange,
    handleSubmit,
    resetForm
  };
};