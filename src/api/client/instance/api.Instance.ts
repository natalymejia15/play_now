import axios from 'axios'
import { requestInterceptor, responseInterceptor } from '../interceptors'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  withCredentials: true,
})

api.interceptors.request.use(requestInterceptor)
api.interceptors.response.use(undefined, responseInterceptor)