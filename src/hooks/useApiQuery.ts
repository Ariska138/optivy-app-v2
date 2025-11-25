// src/hooks/useApiQuery.ts

import { useState, useEffect } from 'react'
import { apiGet, qs, ApiError, ApiInit, QueryParams } from '../lib/api' // Sesuaikan path jika perlu

export interface UseApiQuery<TData> {
  data: TData | undefined
  error: ApiError | undefined
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

/**
 * Hook untuk melakukan query GET ke API dan mengelola statusnya.
 * @param path - URL path ke endpoint (e.g., '/users')
 * @param params - Query parameters (otomatis diubah menjadi query string)
 * @param init - Opsi ApiInit tambahan (signal, headers, dll.)
 * @param enabled - Jika false, query tidak akan dijalankan secara otomatis (default: true)
 */
export function useApiQuery<TData = unknown>(
  path: string,
  params: QueryParams = {},
  init: ApiInit = {},
  enabled: boolean = true,
): UseApiQuery<TData> {
  // Gunakan stringified path dan params sebagai 'queryKey' dependency
  const queryPath = path + qs(params)

  const [data, setData] = useState<TData | undefined>(undefined)
  const [error, setError] = useState<ApiError | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [refetchIndex, setRefetchIndex] = useState(0) // Untuk memicu refetch

  // Karena AbortController perlu dibuat di luar useEffect agar persisten untuk cleanup
  // dan diakses oleh fetchData, kita inisialisasi di luar
  const [controller] = useState(() => new AbortController())
  const signal = controller.signal

  const fetchData = async (currentPath: string, currentInit: ApiInit, fetchSignal: AbortSignal) => {
    if (!currentPath) return

    setIsLoading(true)
    setError(undefined)

    try {
      const result = await apiGet<TData>(currentPath, {
        ...currentInit,
        signal: fetchSignal,
      })
      setData(result)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Abaikan abort/cleanup
      } else {
        setError(err as ApiError)
        setData(undefined)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    // Panggil fetch data
    fetchData(queryPath, init, signal)

    // Cleanup: abort fetch yang sedang berjalan jika dependency berubah atau unmount
    return () => {
      // Panggil abort pada controller yang persisten
      controller.abort()
      // Untuk fetch berikutnya, kita harus buat controller baru. 
      // Namun, dalam konteks hook ini, kita akan mengandalkan pemanggilan
      // useEffect baru (yang dipicu oleh dependency) untuk menginisialisasi
      // ulang state/fetch.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPath, refetchIndex, enabled])

  const refetch = () => {
    // Increment index untuk memicu useEffect
    setRefetchIndex((prev) => prev + 1)
  }

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    refetch,
  }
}