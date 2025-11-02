
import React, { useState } from 'react';
import { TrackingPixels as TrackingPixelsType, PixelProvider } from '../types';
import { META_EVENTS, TIKTOK_EVENTS } from '../constants';

interface Props {
  pixels: TrackingPixelsType;
  onPixelChange: (provider: PixelProvider, field: 'id' | 'event', value: string) => void;
}

const focusRingClass = "focus:ring-2 focus:ring-[#a379d7]/30 focus:border-[#a379d7]";

const TrackingPixels: React.FC<Props> = ({ pixels, onPixelChange }) => {
  const [activeTab, setActiveTab] = useState<PixelProvider>('meta');

  const tabs: { key: PixelProvider; label: string }[] = [
    { key: 'meta', label: 'Meta (Facebook)' },
    { key: 'google', label: 'Google' },
    { key: 'tiktok', label: 'TikTok' },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'meta':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="metaPixelId" className="block text-sm font-medium text-slate-600 mb-2">Meta Pixel ID:</label>
              <input type="text" id="metaPixelId" value={pixels.meta.id} onChange={(e) => onPixelChange('meta', 'id', e.target.value)} className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`} placeholder="Masukkan ID Meta Pixel Anda" />
            </div>
            <div>
              <label htmlFor="metaEvent" className="block text-sm font-medium text-slate-600 mb-2">Event Standar:</label>
              <select id="metaEvent" value={pixels.meta.event} onChange={(e) => onPixelChange('meta', 'event', e.target.value)} className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`}>
                {META_EVENTS.map(event => <option key={event} value={event}>{event}</option>)}
              </select>
            </div>
          </div>
        );
      case 'google':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="googleTagId" className="block text-sm font-medium text-slate-600 mb-2">Google Tag ID (G-XXXXXX):</label>
              <input type="text" id="googleTagId" value={pixels.google.id} onChange={(e) => onPixelChange('google', 'id', e.target.value)} className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`} placeholder="Masukkan ID Google Tag Anda" />
            </div>
            <div>
              <label htmlFor="googleEvent" className="block text-sm font-medium text-slate-600 mb-2">Nama Event Conversion:</label>
              <input type="text" id="googleEvent" value={pixels.google.event} onChange={(e) => onPixelChange('google', 'event', e.target.value)} className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`} placeholder="Contoh: conversion_form_submit" />
            </div>
          </div>
        );
      case 'tiktok':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="tiktokPixelId" className="block text-sm font-medium text-slate-600 mb-2">TikTok Pixel ID:</label>
              <input type="text" id="tiktokPixelId" value={pixels.tiktok.id} onChange={(e) => onPixelChange('tiktok', 'id', e.target.value)} className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`} placeholder="Masukkan ID TikTok Pixel Anda" />
            </div>
            <div>
              <label htmlFor="tiktokEvent" className="block text-sm font-medium text-slate-600 mb-2">Event Standar:</label>
              <select id="tiktokEvent" value={pixels.tiktok.event} onChange={(e) => onPixelChange('tiktok', 'event', e.target.value)} className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`}>
                {TIKTOK_EVENTS.map(event => <option key={event} value={event}>{event}</option>)}
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-slate-700 mb-1">2. Pasang Piksel Pelacakan</h2>
      <p className="text-sm text-slate-500 mb-4">Hubungkan dengan platform iklan untuk melacak konversi.</p>
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-[#a379d7] text-[#a379d7] font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 font-medium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TrackingPixels;
