import type { AuthState } from "@/modules"

export const getInitialAuthState = (): AuthState => {
  const token = sessionStorage.getItem('token')

  return {
    token: token || null,
    loading: false,
    error: null,
  }
}
