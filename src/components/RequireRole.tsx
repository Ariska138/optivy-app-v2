// src/components/RequireRole.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function RequireRole({ role }: { role: 'admin' | 'customer' }) {
  const { state } = useAuth();
  const loc = useLocation();
  const user = state.user;

  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;

  if (user.role !== role) {
    if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  return <Outlet />;
}
