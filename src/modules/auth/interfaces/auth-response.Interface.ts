export interface LoginSuccessResponse {
    accessToken: string
}
export interface LoginRequireSelectionResponse {
    requireSelection: true
}

export type LoginResponse = LoginSuccessResponse | LoginRequireSelectionResponse

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
