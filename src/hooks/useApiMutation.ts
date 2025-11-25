// src/hooks/useApiMutation.ts

import { useState } from 'react'
import {
  apiJson,
  ApiError,
  ApiInit,
  HttpMethod,
  ApiJsonInit
} from '../lib/api' // Sesuaikan path impor

export interface UseApiMutation<TData, TBody> {
  data: TData | undefined // Data respons dari mutasi
  error: ApiError | undefined // Objek error jika mutasi gagal
  isLoading: boolean // True saat mutasi sedang berjalan
  isError: boolean // True jika ada error

  // Fungsi yang dipanggil pengguna untuk menjalankan mutasi
  mutate: (body: TBody, options?: ApiInit) => Promise<TData | undefined>

  reset: () => void // Fungsi untuk mereset status
}

/**
 * Hook untuk melakukan operasi mutasi (POST, PUT, PATCH, DELETE) ke API.
 * @param path - URL path ke endpoint (e.g., '/users')
 * @param method - Metode HTTP untuk mutasi (POST, PUT, PATCH, DELETE)
 * @param init - Opsi ApiInit tambahan (headers, timeoutMs, dll.)
 */
export function useApiMutation<TData = unknown, TBody = unknown>(
  path: string,
  method: Exclude<HttpMethod, 'GET' | 'HEAD'> = 'POST', // Default POST
  init: ApiInit = {},
): UseApiMutation<TData, TBody> {

  const [data, setData] = useState<TData | undefined>(undefined)
  const [error, setError] = useState<ApiError | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const mutate = async (body: TBody, options?: ApiInit): Promise<TData | undefined> => {
    setIsLoading(true)
    setError(undefined)
    setData(undefined)

    try {
      const mergedInit: ApiJsonInit<TBody> = {
        ...init, // Opsi dari deklarasi hook
        ...options, // Opsi dari pemanggilan mutate
        method: method as HttpMethod,
        body: body,
      }

      const result = await apiJson<TData, TBody>(path, mergedInit)

      setData(result)
      setIsLoading(false)
      return result
    } catch (err) {
      setError(err as ApiError)
      setIsLoading(false)
      return undefined
    }
  }

  const reset = () => {
    setData(undefined)
    setError(undefined)
    setIsLoading(false)
  }

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    mutate,
    reset,
  }
}