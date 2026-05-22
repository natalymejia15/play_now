import { api } from "../instance";

export interface CreatePaymentResponse {
  success: boolean;
  transactionId: string;
}

export interface TransactionResponse {
  data: {
    payment_method: {
      extra: {
        pseURL: string;
      };
    };
  };
}

export const createBancolombiaPayment = async (
  payload: unknown
) => {
  const { data } =
    await api.post<CreatePaymentResponse>(
      "/payments/bancolombia",
      payload
    );

  return data;
};

export const getTransactionById = async (
  transactionId: string
) => {
  const { data } =
    await api.get<TransactionResponse>(
      `/payments/transaction/${transactionId}`
    );

  return data;
};