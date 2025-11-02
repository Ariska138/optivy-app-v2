import React from 'react';
import { Integration } from '../types';

// Logos as simple functional components
const StartsenderLogo = () => <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">SS</div>;
const WuhuLogo = () => <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">WH</div>;
const MailchimpLogo = () => <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-gray-800 text-lg">MC</div>;
const ConvertKitLogo = () => <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">CK</div>;


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
    }
];
