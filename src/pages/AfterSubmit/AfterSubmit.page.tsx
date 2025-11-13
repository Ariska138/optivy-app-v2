import React, { useState, useCallback } from 'react';
import { AppConfig, AfterSubmitActionType } from './types';
import { DEFAULT_PAYMENT_TEMPLATE } from './constants';
import ActionConfigurator from './components/ActionConfigurator';
import TrackingPixels from './components/TrackingPixels';
import PreviewPanel from './components/PreviewPanel';
import { PageType } from '@/types';
import { useNavigate } from 'react-router-dom';

const initialState: AppConfig = {
  afterSubmitAction: {
    type: 'payment_instructions',
    details: {
      instructions: DEFAULT_PAYMENT_TEMPLATE,
      message: '',
      number: '',
      url: '',
    },
  },
  trackingPixels: {
    meta: { id: '', event: 'Purchase' },
    google: { id: '', event: '' },
    tiktok: { id: '', event: 'CompletePayment' },
  },
};

const AfterSubmitPage = () => {
  const navigate = useNavigate();

  const [config, setConfig] = useState<AppConfig>(initialState);
  const [outputJson, setOutputJson] = useState<string>('');

  const handleActionTypeChange = useCallback((type: AfterSubmitActionType) => {
    setConfig((prev) => ({
      ...prev,
      afterSubmitAction: {
        ...prev.afterSubmitAction,
        type: type,
      },
    }));
    setOutputJson('');
  }, []);

  const handleDetailsChange = useCallback((field: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      afterSubmitAction: {
        ...prev.afterSubmitAction,
        details: {
          ...prev.afterSubmitAction.details,
          [field]: value,
        },
      },
    }));
    setOutputJson('');
  }, []);

  const handlePixelChange = useCallback(
    (
      provider: 'meta' | 'google' | 'tiktok',
      field: 'id' | 'event',
      value: string
    ) => {
      setConfig((prev) => ({
        ...prev,
        trackingPixels: {
          ...prev.trackingPixels,
          [provider]: {
            ...prev.trackingPixels[provider],
            [field]: value,
          },
        },
      }));
      setOutputJson('');
    },
    []
  );

  const generateFinalConfig = (): object => {
    const { type, details } = config.afterSubmitAction;
    const finalConfig: any = {
      afterSubmitAction: { type, details: {} },
      trackingPixels: config.trackingPixels,
    };

    switch (type) {
      case 'payment_instructions':
        finalConfig.afterSubmitAction.details.instructions =
          details.instructions;
        break;
      case 'whatsapp_direct':
        finalConfig.afterSubmitAction.details.message = details.message;
        break;
      case 'whatsapp_specific':
        finalConfig.afterSubmitAction.details.number = details.number;
        finalConfig.afterSubmitAction.details.message = details.message;
        break;
      case 'landing_page':
      case 'self_hosted':
      case 'custom_url':
        finalConfig.afterSubmitAction.details.url = details.url;
        break;
    }
    return finalConfig;
  };

  const handleSave = () => {
    const finalConfig = generateFinalConfig();
    setOutputJson(JSON.stringify(finalConfig, null, 2));
    alert('Pengaturan telah disimpan sebagai draf!');
  };

  const handleLaunch = () => {
    alert('Konfigurasi berhasil di-launching!');
    navigate('/forms-notifications');
    // const finalConfig = generateFinalConfig();
    // setOutputJson(JSON.stringify(finalConfig, null, 2));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-7xl text-slate-600 antialiased">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          After Submit Action
        </h1>
        <p className="text-lg text-slate-500 mt-2">
          Konfigurasi alur dan pelacakan setelah formulir berhasil dikirim.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <ActionConfigurator
            action={config.afterSubmitAction}
            onActionTypeChange={handleActionTypeChange}
            onDetailsChange={handleDetailsChange}
          />
          <TrackingPixels
            pixels={config.trackingPixels}
            onPixelChange={handlePixelChange}
          />
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors duration-200"
            >
              Simpan Draf
            </button>
            <button
              onClick={handleLaunch}
              className="w-full sm:w-auto bg-[#a379d7] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#8f60c9] transition-colors duration-200 shadow-lg shadow-[#f3eefc]"
            >
              Launching
            </button>
          </div>
        </div>

        <PreviewPanel
          isVisible={config.afterSubmitAction.type === 'payment_instructions'}
          content={config.afterSubmitAction.details.instructions || ''}
        />
      </main>

      {outputJson && (
        <div className="mt-8 bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Hasil Konfigurasi (JSON)
          </h3>
          <pre className="text-emerald-300 text-sm whitespace-pre-wrap break-all">
            {outputJson}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AfterSubmitPage;

