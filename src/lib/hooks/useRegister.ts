import type { DocumentType, RegisterFormData, RegisterFormProps } from "@/interfaces";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useRegister = ({ onSubmit, onToggleForm }: RegisterFormProps) => {

    const [documentType, setDocumentType] = useState<DocumentType>("CC");
    const [email, setEmail] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondFirstName, setSecondFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isNIT = documentType === "NIT";

    useEffect(() => {
        document.title = "Registrar- Play now";
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData: RegisterFormData = {
                tipoDocumento: documentType.toUpperCase() as "CC" | "NIT",
                numeroDocumento: documentNumber,
                primerNombre: !isNIT ? firstName : "",
                segundoNombre: !isNIT ? secondFirstName : "",
                primerApellido: !isNIT ? lastName : "",
                segundoApellido: !isNIT ? secondLastName : "",
                razonSocial: isNIT ? businessName : "",
                correo: email,
                celular: phoneNumber,
                direccion: address,
                password: documentNumber,
                idRol: 3,
            };

            await onSubmit(formData);
        } catch (error: unknown) {
            console.error("Error en handleSubmit:", error);

            if (error instanceof Error) {
                console.error("Mensaje:", error.message);
            }

            const axiosError = error as AxiosError;

            if (axiosError.response) {
                console.error("Respuesta del backend:", axiosError.response.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        documentType,
        setDocumentType,
        email,
        setEmail,
        documentNumber,
        setDocumentNumber,
        phoneNumber,
        setPhoneNumber,
        businessName,
        setBusinessName,
        address,
        setAddress,
        firstName,
        setFirstName,
        secondFirstName,
        setSecondFirstName,
        lastName,
        setLastName,
        secondLastName,
        setSecondLastName,
        isLoading,
        handleSubmit,
        isNIT,
        onToggleForm,
    }
}