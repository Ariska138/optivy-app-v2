import React from 'react';
import { Integration } from '../types';

// Logos as simple functional components
const StartsenderLogo = () => (
  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">
    SS
  </div>
);
const WuhuLogo = () => (
  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">
    WH
  </div>
);
const MailchimpLogo = () => (
  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-gray-800 text-lg">
    MC
  </div>
);
const ConvertKitLogo = () => (
  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">
    CK
  </div>
);
const MetaLogo = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-2xl">
    M
  </div>
);
const TikTokLogo = () => (
  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2.19c-.596.043-1.122.164-1.588.39a4.2 4.2 0 0 1-1.488.906c.07.417.176.86.32 1.395.144.535.336 1.12.596 1.77C13.23 11.24 13 11.86 13 12.5c0 .572.234 1.156.702 1.625.468.47 1.05.734 1.625.734.572 0 1.156-.264 1.625-.734.468-.469.702-1.053.702-1.625 0-1.99-1.39-3.743-3.52-4.29V5.12c.87-.4 1.437-1.243 1.437-2.246 0-1.38-1.12-2.5-2.5-2.5H9zM7 14a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
    </svg>
  </div>
);
const GoogleAnalyticsLogo = () => (
  <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center font-bold text-white text-lg">
    GA
  </div>
);

export const availableIntegrations: Integration[] = [
  {
    id: 'startsender',
    name: 'Startsender',
    type: 'whatsapp',
    logo: <StartsenderLogo />,
    description: 'Kirim notifikasi WhatsApp otomatis ke pelanggan Anda.',
    connected: true,
  },
  {
    id: 'wuhu',
    name: 'Wuhu',
    type: 'whatsapp',
    logo: <WuhuLogo />,
    description: 'Platform broadcast dan otomasi pesan WhatsApp.',
    connected: false,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    type: 'email',
    logo: <MailchimpLogo />,
    description: 'Sinkronkan kontak dan kirim kampanye email marketing.',
    connected: false,
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    type: 'email',
    logo: <ConvertKitLogo />,
    description: 'Hubungkan dengan layanan email marketing untuk kreator.',
    connected: true,
  },
  {
    id: 'meta-pixel',
    name: 'Meta Pixel (Facebook)',
    type: 'tracking',
    logo: <MetaLogo />,
    description: 'Lacak konversi dari iklan Facebook & Instagram.',
    connected: true,
  },
  {
    id: 'tiktok-pixel',
    name: 'TikTok Pixel',
    type: 'tracking',
    logo: <TikTokLogo />,
    description: 'Ukur efektivitas kampanye iklan TikTok Anda.',
    connected: false,
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    type: 'tracking',
    logo: <GoogleAnalyticsLogo />,
    description: 'Analisis lalu lintas situs web dan perilaku pengunjung.',
    connected: true,
  },
];

