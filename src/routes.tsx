// routes.tsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorPage from '@pages/Error/Error.page';
import { lazy, Suspense } from 'react';

import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';

// import DashboardPage from './pages/Dashboard/Dashboard.page';
// import EditProfilePage from './pages/EditProfile/EditProfile.page';
// import OrderManagementPage from './pages/OrderManagement/OrderManagement.page';
import ProductsPage from './pages/Products/Products.page';
import DomainsPage from './pages/Domains/Domains.page';
// import TeamPage from './pages/Team/Team.page';
// import IntegrationsPage from './pages/Integrations/Integrations.page';
import ProductCreationPage from './pages/ProductCreation/ProductCreation.page';
import AfterSubmitPage from './pages/AfterSubmit/AfterSubmit.page';
// import DiscountCodesPage from './pages/DiscountCodes/DiscountCodes.page';
// import LocalPaymentsPage from './pages/LocalPayments/LocalPayments.page';

import type { PageType } from './types';
import PageBuilderPage from './pages/PageBuilder/PageBuilder.page';
import PublishPage from './pages/Publish/Publish.page';

const Home = lazy(() => import('@pages/Home/Home.page'));
const Login = lazy(() => import('@pages/Login/Login.page'));

const IndexPage = lazy(() => import('@/pages/Splashscreen/SplashScreen.page'));
const RegisterPage = lazy(() => import('@/pages/Register/Register.page'));
const StatusPage = lazy(() => import('@/pages/Status/Status.page'));

import RequireRole from '@/components/RequireRole'; // baru
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import OtpVerification from './pages/OtpVerify/OtpVerify.page';
import DashboardPage from './pages/Dashboard/Dashboard.page';
import MainLayout from './components/layout/MainLayout';

export default function WebRoutes() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  return (
    <MainLayout>
      <RouteErrorBoundary>
        <Suspense fallback={<div className="p-8">Loading…</div>}>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<RequireRole role="admin" />}>
                <Route
                  path="admin"
                  element={<DashboardPage setCurrentPage={setCurrentPage} />}
                />
              </Route>
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </MainLayout>
  );
}
