import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  withCredentials: true,
})
