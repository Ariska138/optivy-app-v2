/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
// pages/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT useNavigate
import type { User } from '@/types/user.type';
import { apiGet, apiPost } from '@/lib/api';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'LOADING' }
  | { type: 'READY' }
  | { type: 'SET_AUTH'; payload: User };

interface AuthContextType {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuthState: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_AUTH':
      return { isAuthenticated: true, user: action.payload, loading: false };
    case 'LOADING':
      return { ...state, loading: true };
    case 'READY':
      return { ...state, loading: false };
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload, loading: false };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    loading: true,
  });
  const navigate = useNavigate(); // <-- 2. INISIALISASI useNavigate DI SINI

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiGet<User>('/auth/me', {
          timeoutMs: 10_000,
          retry: 0,
          cache: 'no-store',
        });
        if (!alive) return;
        dispatch({ type: 'LOGIN', payload: data as User });
      } catch {
        if (!alive) return;
        dispatch({ type: 'READY' });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const login = async (username: string, password?: string) => {
    dispatch({ type: 'LOADING' });

    const data = await apiPost<any>(`/auth/login`, { username, password });

    if (!data) throw new Error('Login failed');

    dispatch({
      type: 'LOGIN',
      payload: {
        id: data.id,
        username,
        role: data.role,
        name: data.name,
        status: data.status,
      },
    });
  };

  // --- 3. FUNGSI LOGOUT DIPERBAIKI TOTAL ---
  const logout = async () => {
    try {
      // Panggil API untuk menghapus cookie di backend
      await apiPost(`/auth/logout`);
    } catch (error) {
      console.error(
        'API logout call failed, but proceeding with client-side logout:',
        error
      );
    } finally {
      // Selalu bersihkan state di sisi klien
      dispatch({ type: 'LOGOUT' });

      // Gunakan navigasi internal React Router, bukan hard refresh
      navigate('/login', { replace: true });
    }
  };

  const setAuthState = (user: User) => {
    dispatch({ type: 'SET_AUTH', payload: user });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
