import type { AxiosError } from "axios"

export type FailedRequest = {
  resolve: (token: string) => void
  reject: (error: AxiosError) => void
}
