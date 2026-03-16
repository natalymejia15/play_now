import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from './authService'
import type { LoginData, LoginResponse } from '@/modules'
import axios from 'axios'

const getBackendMessage = (err: unknown): string => {
  if (!axios.isAxiosError(err)) return 'Error de red o desconocido.'

  const data = err.response?.data
  if (typeof data?.message === 'string') return data.message
  if (typeof data?.error   === 'string') return data.error
  if (typeof data          === 'string') return data

  return 'Ha ocurrido un error. Intenta nuevamente.'
}

export const loginUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials)
    } catch (err) {
      return rejectWithValue(getBackendMessage(err))
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