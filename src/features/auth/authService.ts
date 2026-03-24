import { api, refreshApi } from "@/api"
import type { LoginData, LoginResponse } from "@/modules"


export const authService = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const payload = { correo: data.email, password: data.password }
    const response = await api.post<LoginResponse>('/auth/login', payload)
    return response.data
  },

  refresh: async (): Promise<{ accessToken: string }> => {
    const response = await refreshApi.post<{ accessToken: string }>('/auth/refresh')
    return response.data
  },


  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },
}
