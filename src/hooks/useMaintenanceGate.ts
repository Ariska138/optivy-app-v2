import { useState, useEffect } from 'react';

const MAINTENANCE_CODE_KEY = 'optivy_maintenance_token';
const CORRECT_CODE = 'bismillah'; // GANTI DENGAN KODE RAHASIA ANDA

export function useMaintenanceGate() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Cek apakah token sudah ada di localStorage
    const storedCode = localStorage.getItem(MAINTENANCE_CODE_KEY);
    if (storedCode === CORRECT_CODE) {
      setHasAccess(true);
    }
    setIsLoading(false);
  }, []);

  const grantAccess = (code: string) => {
    if (code === CORRECT_CODE) {
      localStorage.setItem(MAINTENANCE_CODE_KEY, CORRECT_CODE);
      setHasAccess(true);
      return true;
    }
    return false;
  };

  const removeAccess = () => {
    localStorage.removeItem(MAINTENANCE_CODE_KEY);
    setHasAccess(false);
  };

  return { hasAccess, isLoading, grantAccess, removeAccess };
}