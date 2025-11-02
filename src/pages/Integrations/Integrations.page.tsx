import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { availableIntegrations } from '../../constants/integrations';
import type { Integration, IntegrationType, Pixel } from '../../types';
import { IntegrationCard } from './components/IntegrationCard';
import { TrackingIntegrationCard } from './components/TrackingIntegrationCard';
import { ApiIntegrationModal } from './components/ApiIntegrationModal';
import { TrackingIntegrationModal } from './components/TrackingIntegrationModal';
// Fix: Import GoogleGenAI from @google/genai
// import { GoogleGenAI } from '@google/genai';

const getSuggestionForIntegration = async (
  integrationName: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return `Untuk menghubungkan ${integrationName}, Anda biasanya memerlukan API Key atau mengikuti instruksi otentikasi dari penyedia layanan. Periksa dokumentasi resmi mereka untuk langkah-langkah detail.`;
  }
  try {
    // Fix: Initialize GoogleGenAI with named apiKey parameter
    // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';
    const prompt = `Berikan ringkasan singkat dalam 1 kalimat, bagaimana cara mengintegrasikan layanan ${integrationName} untuk sebuah platform e-commerce.`;

    // Fix: Use ai.models.generateContent to generate content
    // const response = await ai.models.generateContent({
    //   model: model,
    //   contents: prompt,
    // });

    // // Fix: Access response.text to get the generated text
    // return response.text;
  } catch (error) {
    console.error('Error fetching suggestion from AI:', error);
    return `Gagal mendapatkan saran untuk ${integrationName}. Silakan periksa dokumentasi resmi mereka.`;
  }
};

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(
    availableIntegrations
  );
  const [trackingData, setTrackingData] = useState<{ [key: string]: Pixel }>({
    'meta-pixel': { id: '123456789012345', event: 'Purchase' },
    'tiktok-pixel': { id: '', event: '' },
    'google-analytics': { id: 'UA-12345-6', event: 'purchase' },
  });
  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({
    startsender: 'ss_prod_abcdef123456',
    wuhu: '',
    mailchimp: '',
    convertkit: 'ck_prod_zyxwvu987654',
  });

  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [suggestion, setSuggestion] = useState('');
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

  const handleManage = async (id: string) => {
    const integration = integrations.find((int) => int.id === id);
    if (integration) {
      setSelectedIntegration(integration);
      //   setIsLoadingSuggestion(true);
      //   const suggestionText = await getSuggestionForIntegration(
      //     integration.name
      //   );
      //   setSuggestion(suggestionText);
      //   setIsLoadingSuggestion(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedIntegration(null);
    setSuggestion('');
  };

  const handleSaveTracking = (id: string, data: Pixel) => {
    setTrackingData((prev) => ({ ...prev, [id]: data }));
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, connected: !!data.id } : int
      )
    );
    handleCloseModal();
  };

  const handleSaveApi = (id: string, apiKey: string) => {
    setApiKeys((prev) => ({ ...prev, [id]: apiKey }));
    setIntegrations((prev) =>
      prev.map((int) => (int.id === id ? { ...int, connected: !!apiKey } : int))
    );
    handleCloseModal();
  };

  const renderIntegrationList = (type: IntegrationType, title: string) => {
    const filteredIntegrations = integrations.filter(
      (int) => int.type === type
    );

    return (
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">
          Hubungkan dengan layanan pihak ketiga untuk memperluas fungsionalitas
          toko Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            if (type === 'tracking') {
              return (
                <TrackingIntegrationCard
                  key={integration.id}
                  integration={integration}
                  onManage={handleManage}
                  trackingData={
                    trackingData[integration.id] || { id: '', event: '' }
                  }
                />
              );
            }
            return (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onManage={handleManage}
                apiKey={apiKeys[integration.id]}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const isTrackingModal = selectedIntegration?.type === 'tracking';

  return (
    <div className="h-full bg-violet-50">
      <Header title="Kelola Integrasi" />
      <div className="p-8">
        {renderIntegrationList('whatsapp', 'Integrasi WhatsApp')}
        {renderIntegrationList('email', 'Integrasi Email Marketing')}
        {renderIntegrationList(
          'tracking',
          'Integrasi Pelacakan (Pixel & Analytics)'
        )}
      </div>
      {selectedIntegration &&
        (isTrackingModal ? (
          <TrackingIntegrationModal
            integration={selectedIntegration}
            initialData={
              trackingData[selectedIntegration.id] || { id: '', event: '' }
            }
            onClose={handleCloseModal}
            onSave={handleSaveTracking}
          />
        ) : (
          <ApiIntegrationModal
            integration={selectedIntegration}
            initialApiKey={apiKeys[selectedIntegration.id] || ''}
            onClose={handleCloseModal}
            onSave={handleSaveApi}
            suggestion={suggestion}
            isLoadingSuggestion={isLoadingSuggestion}
          />
        ))}
    </div>
  );
};

export default IntegrationsPage;

