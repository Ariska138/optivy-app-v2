/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// useOTP.ts
import { apiPost } from '@/lib/api';
import { useState, useCallback } from 'react';

// Define the structure for the API response and include generic T
export interface OtpResponse<T = any> {
  message: string;
  data?: T;               // <-- gunakan T di sini
  [key: string]: any;     // Allow other properties if needed
}

export interface ApiError {
  message: string;
}

export interface UseOtp<T = any> {
  isLoading: boolean;
  error: ApiError | null;
  sendOtp: (email: string) => Promise<OtpResponse<T> | null>;
  verifyOtp: (email: string, otp: string) => Promise<OtpResponse<T> | null>;
}

export const useOTP = <T = any>(): UseOtp<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const sendOtp = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiPost<any>('/otp/send', {
        email
      });

      if (!data) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      // Jika API menaruh payload di `data` property, map ke OtpResponse<T>
      // Jika API langsung mengembalikan object yang ingin dipakai sebagai data,
      // bungkus menjadi { message, data } sesuai OtpResponse<T> di atas.
      const result: OtpResponse<T> = {
        message: data.message ?? 'OK',
        data: data.data ?? (data as unknown as T), // accommodative mapping
        ...data,
      };

      return result;
    } catch (err: any) {
      setError({ message: err?.message ?? String(err) });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiPost<any>('/otp/verify', {
        email, otp
      });

      if (!data) {
        throw new Error(data.error || 'Failed to verify OTP');
      }

      const result: OtpResponse<T> = {
        message: data.message ?? 'OK',
        data: data.data ?? (data as unknown as T),
        ...data,
      };

      return result;
    } catch (err: any) {
      setError({ message: err?.message ?? String(err) });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, sendOtp, verifyOtp };
};
