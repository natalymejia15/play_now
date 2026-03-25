import type { AxiosRequestHeaders, InternalAxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

export type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export type RequestHeaders = AxiosRequestHeaders | RawAxiosRequestHeaders | undefined;

export interface ErrorResponse {
  message?: string
}