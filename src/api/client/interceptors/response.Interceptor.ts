import type { AxiosError } from 'axios'
import { authService, logout, refreshToken } from '@/features'
import { refreshManager } from '../auth'
import { api } from '../instance'
import { store } from '@/store'
import type { RequestHeaders, RetryRequestConfig } from '@/interfaces'
import { PUBLIC_ROUTE_PATTERNS } from '@/constants'


const isPublicRoute = (url?: string | null, headers?: RequestHeaders) => {
  if (!url) return false

  const hasAuthHeader = !!(
    headers &&
    (headers.Authorization || headers.authorization || headers['Authorization'] || headers['authorization'])
  )
  if (!hasAuthHeader) return true
  return PUBLIC_ROUTE_PATTERNS.some(pattern => url.includes(pattern))
}

export const responseInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as RetryRequestConfig | undefined

  if (!originalRequest || error.response?.status !== 401) {
    return Promise.reject(error)
  }
  if (isPublicRoute(originalRequest.url, originalRequest.headers)) {
    return Promise.reject(error)
  }

  if (originalRequest._retry) {
    return Promise.reject(error)
  }

  if (refreshManager.isRefreshing()) {
    return new Promise((resolve, reject) => {
      refreshManager.enqueue({
        resolve: token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(api(originalRequest))
        },
        reject,
      })
    })
  }

  originalRequest._retry = true
  refreshManager.start()

  try {
    const { accessToken } = await authService.refresh()

    sessionStorage.setItem('token', accessToken)
    store.dispatch(refreshToken(accessToken))
    refreshManager.resolveQueue(accessToken)

    originalRequest.headers.Authorization = `Bearer ${accessToken}`
    return api(originalRequest)
  } catch (err) {
    refreshManager.rejectQueue(err as AxiosError)
    store.dispatch(logout())

    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }

    return Promise.reject(err)
  } finally {
    refreshManager.stop()
  }
}
