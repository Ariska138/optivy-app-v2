// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import Routes from './routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {' '}
        {/* [!code --] */}
        <Routes />
        {/* [!code --] */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

