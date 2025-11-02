// app/layouts/MainLayout.tsx
import type { ReactNode } from 'react';
import { defaultMeta } from '@/lib/seo';
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* React 19 handles these tags natively */}
      <title>{defaultMeta.title}</title>
      <meta name="description" content={defaultMeta.description} />
      <meta name="theme-color" content={defaultMeta.themeColor} />

      {/* Favicon & App */}
      <link rel="icon" href={defaultMeta.icon} />
      <link rel="manifest" href={defaultMeta.manifest} />
      <link rel="apple-touch-icon" href={defaultMeta.appleTouchIcon} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={defaultMeta.siteName} />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* OG & Twitter */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={defaultMeta.title} />
      <meta property="og:description" content={defaultMeta.description} />
      <meta property="og:image" content={defaultMeta.ogImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={defaultMeta.title} />
      <meta name="twitter:description" content={defaultMeta.description} />

      <main>{children}</main>
      <Toaster richColors position="top-right" />
    </>
  );
}
