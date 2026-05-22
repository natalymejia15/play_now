import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { extractApiErrorMessage, toast, useFormData } from "@/lib";
import {
  INITIAL_DATA_RESERVATIONS,
  type ApiErrorResponseReservations,
  type ReservationsFormData,
  type UseCreateReservationProps,
} from "../interfaces";
import { mapCreateReservationsFormToPayload } from "../mappers";
import { api, createReservations } from "@/api";

const PAGE_TITLE = "Gestión de Deportes - Play now";

const generateReference = () => `rsv-${Date.now()}`;

export interface PaymentUserData {
  customerEmail: string;
  full_name: string;
  userLegalId: string;
  phone_number: string;
}

export const useCreateReservation = ({
  onOpenChange,
  selectedCourt,
}: UseCreateReservationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number>(1);
  const [step, setStep] = useState<1 | 2>(1);
  const [paymentUserData, setPaymentUserData] = useState<PaymentUserData>({
    customerEmail: "",
    full_name: "",
    userLegalId: "",
    phone_number: "",
  });

  const { formData: reservationsData, updateFormData } =
    useFormData<ReservationsFormData>(INITIAL_DATA_RESERVATIONS);

  const pricePerHour = selectedCourt.valorHora ?? selectedCourt.price ?? 0;
  const total = duration * pricePerHour;

  useEffect(() => {
    updateFormData({ cantidadHoras: duration });
  }, [duration, updateFormData]);

  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  const handleChange = (field: keyof ReservationsFormData, value: string) => {
    updateFormData({ [field]: value } as Partial<ReservationsFormData>);
  };

  const handleDurationChange = (value: number) => {
    if (!Number.isNaN(value) && value >= 1 && value <= 4) {
      setDuration(value);
      updateFormData({ cantidadHoras: value });
    }
  };

  const handlePaymentUserChange = (
    field: keyof PaymentUserData,
    value: string
  ) => {
    setPaymentUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrevStep = () => setStep(1);

  const handleError = (error: AxiosError<ApiErrorResponseReservations>) => {
    const description = extractApiErrorMessage(
      error,
      "No se pudo procesar el pago."
    );
    toast({ title: "Error", description, variant: "destructive" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = mapCreateReservationsFormToPayload({
        ...reservationsData,
        courtId: selectedCourt.id,
      });
      await createReservations(payload);

      const reference = generateReference();
      const psePayload = {
        amount: total,        
        currency: "COP",
        customerEmail: paymentUserData.customerEmail,
        reference,
        userType: 0,
        userLegalId: paymentUserData.userLegalId,
        userLegalIdType: "CC",
        financialInstitutionCode: "1001",
        phone_number: paymentUserData.phone_number,
        full_name: paymentUserData.full_name,
      };

      console.log("PSE Payload enviado:", JSON.stringify(psePayload, null, 2));
      console.log("Total calculado:", total);
      console.log("Price per hour:", pricePerHour);
      console.log("Duration:", duration);

      const { data: pseData } = await api.post("payments/bancolombia", psePayload);

      if (!pseData.success || !pseData.transactionId) {
        throw new Error("No se pudo iniciar la transacción.");
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const { data: txData } = await api.get(
        `payments/transaction/${pseData.transactionId}`
      );
      
      console.log("Transaction data:", JSON.stringify(txData, null, 2));

      const paymentURL =
        txData?.paymentUrl ||
        txData?.transaction?.payment_method?.extra?.async_payment_url ||
        txData?.transaction?.payment_method?.extra?.pseURL;

      if (!paymentURL) {
        throw new Error("No se pudo obtener la URL de pago.");
      }

      onOpenChange(false);
      window.open(paymentURL, "_blank");

      // 4. Redirigir a PSE
      toast({
        title: "Reserva creada",
        description: "Serás redirigido a PSE para completar el pago.",
      });

      onOpenChange(false);
    } catch (error) {
      handleError(error as AxiosError<ApiErrorResponseReservations>);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
    handleChange,
    duration,
    handleDurationChange,
    total,
    pricePerHour,
    step,
    handleNextStep,
    handlePrevStep,
    paymentUserData,
    handlePaymentUserChange,
  };
};