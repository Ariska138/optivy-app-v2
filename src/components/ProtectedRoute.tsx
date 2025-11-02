import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { state } = useAuth();

  if (state.loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
