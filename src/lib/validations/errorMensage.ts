import type { ApiError } from '@/modules'
import { toast } from '../hooks'

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const err = error as ApiError
    const data = err.response?.data
    if (data) {
      if (Array.isArray(data.message)) return data.message.join(', ')
      if (typeof data.message === 'string') return data.message
      if (Array.isArray(data.errors)) return data.errors.join(', ')
      if (typeof data.error === 'string') return data.error
    }

    if (typeof err.message === 'string') {
      return err.message
    }
  }
  return 'Ocurrió un error inesperado'
}

export const extractErrorMessage = (error: unknown): string => {
    if (typeof error === "string") return error;

    if (typeof error === "object" && error !== null) {
        const obj = error as Record<string, unknown>;
        if (typeof obj.message === "string") return obj.message;
    }

    return (error as Error)?.message ?? "Error al iniciar sesión";
};

export const showErrorToast = (error: string) =>
    toast({ title: "Error", description: error, variant: "destructive" });