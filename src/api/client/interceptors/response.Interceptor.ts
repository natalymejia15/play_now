import type { AxiosError } from 'axios'
import axios from 'axios'
import { refreshManager } from '../auth'
import { refreshApi } from '../instance/refresh-api.Instance'
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
          resolve(axios(originalRequest))
        },
        reject,
      })
    })
  }

  originalRequest._retry = true
  refreshManager.start()

  try {
    const { data } = await refreshApi.post<{ accessToken: string }>('/auth/refresh')
    const accessToken = data.accessToken

    sessionStorage.setItem('token', accessToken)
    const storeModule = await import('@/store')
    storeModule.store.dispatch({ type: 'auth/refreshToken', payload: accessToken })
    refreshManager.resolveQueue(accessToken)

    originalRequest.headers.Authorization = `Bearer ${accessToken}`
    return axios(originalRequest)
  } catch (err) {
    refreshManager.rejectQueue(err as AxiosError)

    const storeModule = await import('@/store')
    storeModule.store.dispatch({ type: 'auth/logout' })

    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }

    return Promise.reject(err)
  } finally {
    refreshManager.stop()
  }
}
