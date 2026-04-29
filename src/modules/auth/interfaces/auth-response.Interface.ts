import type { User } from "@/interfaces"

export interface LoginResponse {
  accessToken: string
  token: string
  user: User
}

export interface ApiErrorResponse {
    message?: string | string[]
    error?: string
    errors?: string[]
}

export interface ApiError {
    message?: string
    response?: {
        data?: ApiErrorResponse
    }
}
