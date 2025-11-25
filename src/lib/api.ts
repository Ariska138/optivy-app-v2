/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/api.ts

//
// Lightweight API client for Vite + React + TS
// - Credentials: include
// - CSRF for non-GET
// - Timeout with AbortController
// - Retries for GET/HEAD on 429/503/network
// - Helpful helpers: qs, apiJson, apiForm
//

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiErrorShape {
  message: string
  code?: string
  details?: any
}

export class ApiError extends Error {
  status: number
  code?: string
  details?: any
  constructor(status: number, payload: ApiErrorShape | string) {
    const message = typeof payload === 'string' ? payload : payload.message || 'Request failed'
    super(message)
    this.name = 'ApiError'
    this.status = status
    if (typeof payload !== 'string') {
      this.code = payload.code
      this.details = payload.details
    }
  }
}

type ApiInit = Omit<RequestInit, 'body' | 'method' | 'headers'> & {
  headers?: HeadersInit
  timeoutMs?: number
  retry?: number           // default: 2 (GET/HEAD only)
  retryDelayMs?: number    // base delay for backoff
}

export interface ApiJsonInit<TBody> extends ApiInit {
  method?: HttpMethod
  body?: TBody
}

export interface ApiFormInit extends ApiInit {
  method?: Exclude<HttpMethod, 'GET' | 'HEAD'>
  form: FormData
}

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

// ---- CSRF handling ---------------------------------------------------------

let csrfToken: string | null = null
let csrfFetching: Promise<string> | null = null

async function fetchCsrf(): Promise<string> {
  if (csrfToken) return csrfToken
  if (csrfFetching) return csrfFetching
  csrfFetching = (async () => {
    const res = await fetch(joinUrl(API_BASE, '/auth/csrf-token'), {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      csrfFetching = null
      throw new ApiError(res.status, await safeJson(res))
    }
    const data = (await res.json()) as { csrfToken: string }
    csrfToken = data.csrfToken
    csrfFetching = null
    return csrfToken!
  })()
  return csrfFetching
}

export async function refreshCsrf(): Promise<string> {
  csrfToken = null
  return fetchCsrf()
}

// ---- Core fetch with timeout & retry ---------------------------------------

function withTimeout(signal: AbortSignal | undefined, ms: number) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  const anySignal = mergeAbortSignals([signal, controller.signal])
  return {
    signal: anySignal,
    clear: () => clearTimeout(timer),
  }
}

function mergeAbortSignals(signals: Array<AbortSignal | undefined>): AbortSignal | undefined {
  const valid = signals.filter(Boolean) as AbortSignal[]
  if (valid.length === 0) return undefined
  const controller = new AbortController()
  const onAbort = () => controller.abort()
  valid.forEach((s) => {
    if (s.aborted) controller.abort()
    else s.addEventListener('abort', onAbort, { once: true })
  })
  return controller.signal
}

function shouldRetry(method: HttpMethod, status: number, err?: unknown) {
  // Retry only idempotent
  if (!(method === 'GET' || method === 'HEAD')) return false
  if (status === 429 || status === 503 || status === 502 || status === 504) return true
  // Network errors (TypeError from fetch)
  if (err && err instanceof TypeError) return true
  return false
}

function backoff(attempt: number, baseMs: number) {
  const jitter = Math.random() * 0.25 + 0.75 // 0.75x–1x
  return Math.min(2000, baseMs * Math.pow(2, attempt)) * jitter
}

async function safeJson(res: Response): Promise<ApiErrorShape> {
  const text = await res.text().catch(() => '')
  try {
    const data = text ? JSON.parse(text) : {}
    if (typeof data === 'string') {
      // Jika body hanya string (bukan objek), gunakan sebagai pesan
      return { message: data, code: String(res.status) }
    }
    // Cari pesan error di berbagai kunci
    const message = data.error || data.message || data.msg || data.detail || res.statusText
    const code = data.code || String(res.status)

    // Kembalikan objek yang sesuai dengan ApiErrorShape
    return { message, code, details: data }
  } catch {
    // Jika gagal parse JSON atau body kosong
    return { message: text || res.statusText }
  }
}

// ---- Public helpers --------------------------------------------------------

/** Build query string from a record; skip null/undefined/empty string/empty array */
export function qs(params?: Record<string, string | number | boolean | (string | number | boolean)[] | null | undefined>) {
  if (!params) return ''
  const query = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v === null || v === undefined) return
    if (Array.isArray(v)) {
      if (v.length === 0) return
      v.forEach((item) => query.append(k, String(item)))
    } else if (v === '' as any) {
      return
    } else {
      query.set(k, String(v))
    }
  })
  const s = query.toString()
  return s ? `?${s}` : ''
}

export function joinUrl(base: string, path: string) {
  if (base.endsWith('/') && path.startsWith('/')) return base + path.slice(1)
  if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path
  return base + path
}

/** JSON API (auto CSRF for non-GET) */
export async function apiJson<TResp = unknown, TBody = unknown>(
  path: string,
  init: ApiJsonInit<TBody> = {},
): Promise<TResp> {
  const method = (init.method ?? 'GET').toUpperCase() as HttpMethod
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')

  // Attach CSRF for mutating methods
  if (method !== 'GET' && method !== 'HEAD') {
    headers.set('Content-Type', 'application/json')
    headers.set('X-CSRF-Token', await fetchCsrf())
  }

  const timeoutMs = init.timeoutMs ?? 12000
  const retryMax = init.retry ?? 2
  const retryDelayMs = init.retryDelayMs ?? 200

  let attempt = 0

  while (true) {
    const { signal, clear } = withTimeout(init.signal ?? undefined, timeoutMs)
    try {
      const res = await fetch(joinUrl(API_BASE, path), {
        ...init,
        method,
        headers,
        body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
        credentials: 'include',
        signal,
      })

      clear()

      if (res.ok) {
        if (res.status === 204) return undefined as unknown as TResp
        return (await res.json()) as TResp
      }

      // 401 with stale/missing CSRF → refresh once for mutating
      if ((res.status === 401 || res.status === 419) && method !== 'GET' && attempt === 0) {
        await refreshCsrf()
        attempt++
        continue
      }

      const payload = await safeJson(res)
      if (attempt < retryMax && shouldRetry(method, res.status)) {
        await waitMs(backoff(attempt, retryDelayMs))
        attempt++
        continue
      }
      throw new ApiError(res.status, payload)
    } catch (err) {
      clear()
      // AbortError: bubble up immediately
      if (err instanceof DOMException && err.name === 'AbortError') throw err
      if (attempt < retryMax && shouldRetry(method, 0, err)) {
        await waitMs(backoff(attempt, retryDelayMs))
        attempt++
        continue
      }
      // Network-level error → wrap
      if (err instanceof ApiError) throw err
      throw new ApiError(0, { message: (err as Error)?.message ?? 'Network error' })
    }
  }
}

/** Multipart/FormData API (files upload) */
export async function apiForm<TResp = unknown>(
  path: string,
  init: ApiFormInit,
): Promise<TResp> {
  const method = (init.method ?? 'POST').toUpperCase() as HttpMethod
  if (method === 'GET' || method === 'HEAD') {
    throw new Error('apiForm only supports mutating methods')
  }
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  headers.set('X-CSRF-Token', await fetchCsrf())

  const timeoutMs = init.timeoutMs ?? 30000

  const { signal, clear } = withTimeout(init.signal ?? undefined, timeoutMs)
  try {
    const res = await fetch(joinUrl(API_BASE, path), {
      ...init,
      method,
      headers,
      body: init.form,
      credentials: 'include',
      signal,
    })
    clear()
    if (!res.ok) throw new ApiError(res.status, await safeJson(res))
    if (res.status === 204) return undefined as unknown as TResp
    return (await res.json()) as TResp
  } catch (err) {
    clear()
    if (err instanceof ApiError) throw err
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw new ApiError(0, { message: (err as Error)?.message ?? 'Network error' })
  }
}

/** Convenience GET */
export function apiGet<TResp = unknown>(path: string, init?: ApiInit) {
  return apiJson<TResp>(path, { ...init, method: 'GET' })
}

/** Convenience POST JSON */
export function apiPost<TResp = unknown, TBody = unknown>(path: string, body?: TBody, init?: ApiInit) {
  return apiJson<TResp, TBody>(path, { ...init, method: 'POST', body })
}

/** Convenience PUT JSON */
export function apiPut<TResp = unknown, TBody = unknown>(path: string, body?: TBody, init?: ApiInit) {
  return apiJson<TResp, TBody>(path, { ...init, method: 'PUT', body })
}

/** Convenience PATCH JSON */
export function apiPatch<TResp = unknown, TBody = unknown>(path: string, body?: TBody, init?: ApiInit) {
  return apiJson<TResp, TBody>(path, { ...init, method: 'PATCH', body })
}

/** Convenience DELETE */
export function apiDelete<TResp = unknown, TBody = unknown>(path: string, body?: TBody, init?: ApiInit) {
  return apiJson<TResp, TBody>(path, { ...init, method: 'DELETE', body });
}

function waitMs(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete,
}