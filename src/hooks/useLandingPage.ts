/* eslint-disable @typescript-eslint/no-explicit-any */
// file: src/hooks/useLandingPageManager.ts

import { useState, useEffect, useCallback } from 'react';
// Asumsi Anda memiliki helper API untuk semua metode HTTP
import { apiGet, apiPost, apiPut, apiDelete } from '@/src/lib/api';
import type {
  LandingPage,
  DomainPayload,
  UpdateContentPayload,
  LandingPageWithDns
} from '@shared/types/landingpage.type';

/**
 * Hook untuk mengambil dan mengelola data landing page milik pengguna secara menyeluruh.
 * Menyediakan state dan fungsi untuk operasi CRUD (Create, Read, Update, Delete).
 */
export function useLandingPageManager() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true); // Loading awal untuk fetch
  const [actionLoading, setActionLoading] = useState(false); // Loading untuk aksi (create/update/delete)
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data awal
  const fetchUserPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet<LandingPage[]>('/landingpages/me');
      setPages(data);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data landing page.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Jalankan fetch awal saat hook digunakan
  useEffect(() => {
    fetchUserPages();
  }, [fetchUserPages]);

  // --- Fungsi Aksi (CRUD) ---

  const createPage = async (payload: DomainPayload): Promise<LandingPageWithDns | undefined> => {
    setActionLoading(true);
    setError(null);
    try {
      const newPage = await apiPost<LandingPageWithDns>('/landingpages', payload);
      // Tambahkan halaman baru ke state secara otomatis
      setPages(currentPages => [...currentPages, newPage]);
      return newPage;
    } catch (err: any) {
      setError(err.message || 'Gagal membuat halaman.');
    } finally {
      setActionLoading(false);
    }
  };

  const updatePageContent = async (payload: UpdateContentPayload): Promise<LandingPage | undefined> => {
    setActionLoading(true);
    setError(null);
    try {
      const updatedPage = await apiPut<LandingPage>('/landingpages/me/content', {
        ...payload,
        content: JSON.stringify(payload.content) // API mengharapkan string
      });
      // Perbarui halaman yang sesuai di dalam state
      setPages(currentPages =>
        currentPages.map(p => (p.id === updatedPage.id ? updatedPage : p))
      );
      return updatedPage;
    } catch (err: any) {
      setError(err.message || 'Gagal memperbarui konten.');
    } finally {
      setActionLoading(false);
    }
  };

  const deletePage = async (payload: DomainPayload): Promise<boolean> => {
    setActionLoading(true);
    setError(null);
    try {
      await apiDelete('/landingpages/me', { data: payload }); // `data` untuk body di axios.delete
      // Hapus halaman dari state secara otomatis
      setPages(currentPages =>
        currentPages.filter(p => !(p.domain === payload.domain && p.domainType === payload.domainType))
      );
      return true;
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus halaman.');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Anda bisa menambahkan fungsi lain seperti updateDomain, updateStatus dengan pola yang sama.

  return {
    pages,
    loading, // Loading untuk fetch awal
    actionLoading, // Loading untuk aksi
    error,
    fetchUserPages, // Memberikan akses untuk refresh manual jika dibutuhkan
    createPage,
    updatePageContent,
    deletePage,
  };
}