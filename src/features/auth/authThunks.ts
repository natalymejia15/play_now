import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from './authService'
import type {
  LoginData,
  LoginResponse,
} from '@/modules'
import axios from 'axios'

export const loginUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials)
      return data
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status

        if (status === 400) {
          return rejectWithValue('Datos inválidos. Revisa el formulario.')
        }
        if (status === 401 || status === 404) {
          return rejectWithValue('Usuario o contraseña incorrectos.')
        }
        if ((status ?? 0) >= 500) {
          return rejectWithValue('Ha ocurrido un error. Intenta nuevamente.')
        }

        return rejectWithValue('Ha ocurrido un error. Intenta nuevamente.')
      }

      return rejectWithValue('Error de red o desconocido.')
    }
  }
)

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
    } catch {
      return rejectWithValue('Error al cerrar sesión')
    }
  }
)
