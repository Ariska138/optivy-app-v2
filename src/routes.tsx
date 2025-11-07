import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import RequireRole from './components/RequireRole';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import MainLayout from './components/layout/MainLayout';
import App from './App';

// Lazy-loaded page components
const Home = lazy(() => import('./pages/Home/Home.page'));
const Login = lazy(() => import('./pages/Login/Login.page'));
const IndexPage = lazy(() => import('./pages/Splashscreen/SplashScreen.page'));
const RegisterPage = lazy(() => import('./pages/Register/Register.page'));
const StatusPage = lazy(() => import('./pages/Status/Status.page'));
const ErrorPage = lazy(() => import('./pages/Error/Error.page'));
const OtpVerification = lazy(() => import('./pages/OtpVerify/OtpVerify.page'));
const DashboardPage = lazy(() => import('./pages/Dashboard/Dashboard.page'));
const OrderManagementPage = lazy(
  () => import('./pages/OrderManagement/OrderManagement.page')
);
const ProductsPage = lazy(() => import('./pages/Products/Products.page'));
const ProductCreationPage = lazy(
  () => import('./pages/ProductCreation/ProductCreation.page')
);
const AfterSubmitPage = lazy(
  () => import('./pages/AfterSubmit/AfterSubmit.page')
);
const PageBuilderPage = lazy(
  () => import('./pages/PageBuilder/PageBuilder.page')
);
const PublishPage = lazy(() => import('./pages/Publish/Publish.page'));
const DiscountCodesPage = lazy(
  () => import('./pages/DiscountCodes/DiscountCodes.page')
);
const LocalPaymentsPage = lazy(
  () => import('./pages/LocalPayments/LocalPayments.page')
);
const DomainsPage = lazy(() => import('./pages/Domains/Domains.page'));
const TeamPage = lazy(() => import('./pages/Team/Team.page'));
const IntegrationsPage = lazy(
  () => import('./pages/Integrations/Integrations.page')
);

export default function WebRoutes() {
  return (
    <MainLayout>
      <RouteErrorBoundary>
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp-verification" element={<OtpVerification />} />

            {/* Protected Dashboard Routes */}
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<App />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/orders" element={<OrderManagementPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/new" element={<ProductCreationPage />} />
              <Route path="/products/submitted" element={<AfterSubmitPage />} />
              <Route
                path="/products/page-builder"
                element={<PageBuilderPage />}
              />
              <Route path="/products/publish" element={<PublishPage />} />
              <Route path="/discount-codes" element={<DiscountCodesPage />} />
              <Route path="/local-payments" element={<LocalPaymentsPage />} />
              <Route path="/domains" element={<DomainsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />

              {/* Example of a nested admin-only route */}
              <Route element={<RequireRole role="admin" />}>
                {/* <Route path="admin-settings" element={<AdminSettingsPage />} /> */}
              </Route>
            </Route>
            {/* </Route> */}

            {/* Not Found Route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </MainLayout>
  );
}
