import type { FailedRequest } from '@/modules'
import type { AxiosError } from 'axios'

let isRefreshing = false

let failedQueue: FailedRequest[] = []

export const refreshManager = {
  isRefreshing: () => isRefreshing,
  start: () => {
    isRefreshing = true
  },
  stop: () => {
    isRefreshing = false
  },

  enqueue(request: FailedRequest) {
    failedQueue.push(request)
  },

  resolveQueue(token: string) {
    failedQueue.forEach(p => p.resolve(token))
    failedQueue = []
  },

  rejectQueue(error: AxiosError) {
    failedQueue.forEach(p => p.reject(error))
    failedQueue = []
  },
}
