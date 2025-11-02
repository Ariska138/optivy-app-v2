
import React, { useState, useRef, useEffect } from 'react';
import { AfterSubmitAction, AfterSubmitActionType } from '../types';
import VariablesModal from './VariablesModal';

interface Props {
  action: AfterSubmitAction;
  onActionTypeChange: (type: AfterSubmitActionType) => void;
  onDetailsChange: (field: string, value: string) => void;
}

const focusRingClass = "focus:ring-2 focus:ring-[#a379d7]/30 focus:border-[#a379d7]";

const InputField: React.FC<{id: string, label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string}> = ({ id, label, placeholder, value, onChange, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
        <input 
            type={type} 
            id={id} 
            value={value}
            onChange={onChange}
            className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`}
            placeholder={placeholder}
        />
    </div>
);

const TextareaField: React.FC<{id: string, label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number}> = ({ id, label, placeholder, value, onChange, rows = 5 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
        <textarea 
            id={id} 
            rows={rows} 
            value={value}
            onChange={onChange}
            className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`}
            placeholder={placeholder}
        ></textarea>
    </div>
);

const ActionConfigurator: React.FC<Props> = ({ action, onActionTypeChange, onDetailsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleVariableInsert = (variable: string) => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd, value } = textareaRef.current;
      const newValue = value.substring(0, selectionStart) + variable + value.substring(selectionEnd);
      onDetailsChange('instructions', newValue);

      // We need to wait for react to re-render before we can set the cursor
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPosition = selectionStart + variable.length;
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    }
  };


  const renderInputs = () => {
    switch (action.type) {
      case 'payment_instructions':
        return (
          <div>
            <label htmlFor="paymentInstructions" className="block text-sm font-medium text-slate-600 mb-2">Konten Halaman Instruksi:</label>
            <textarea
              id="paymentInstructions"
              ref={textareaRef}
              rows={16}
              value={action.details.instructions || ''}
              onChange={(e) => onDetailsChange('instructions', e.target.value)}
              className={`w-full p-4 bg-slate-50 border border-slate-200 rounded-lg transition-all font-mono text-sm leading-relaxed ${focusRingClass}`}
            ></textarea>
            <div className="mt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#f3eefc] text-[#8f60c9] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                ✨ Sisipkan Variabel
              </button>
            </div>
          </div>
        );
      case 'whatsapp_direct':
        return <TextareaField id="whatsappMessage" label="Template Pesan WhatsApp:" placeholder="Contoh: Halo, saya tertarik dengan produk Anda..." value={action.details.message || ''} onChange={(e) => onDetailsChange('message', e.target.value)} />;
      case 'whatsapp_specific':
        return (
          <div className="space-y-4">
            <InputField id="whatsappNumber" label="Nomor WhatsApp Tujuan (format 62xxxx):" placeholder="Contoh: 6281234567890" value={action.details.number || ''} onChange={(e) => onDetailsChange('number', e.target.value)} />
            <TextareaField id="whatsappSpecificMessage" label="Template Pesan WhatsApp:" placeholder="Contoh: Halo, saya sudah mengisi formulir..." value={action.details.message || ''} onChange={(e) => onDetailsChange('message', e.target.value)} />
          </div>
        );
      case 'landing_page':
        return <InputField type="url" id="landingPageUrl" label="URL Landing Page:" placeholder="https://contoh-landingpage.com" value={action.details.url || ''} onChange={(e) => onDetailsChange('url', e.target.value)} />;
      case 'self_hosted':
        return <InputField type="url" id="selfHostedUrl" label="URL Halaman Orderan/Invoice:" placeholder="https://tokoanda.com/invoice/123" value={action.details.url || ''} onChange={(e) => onDetailsChange('url', e.target.value)} />;
      case 'custom_url':
        return <InputField type="url" id="customUrl" label="URL Kustom:" placeholder="https://url-kustom-anda.com" value={action.details.url || ''} onChange={(e) => onDetailsChange('url', e.target.value)} />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-slate-700 mb-1">1. Pilih Aksi</h2>
      <p className="text-sm text-slate-500 mb-4">Tentukan tujuan pengguna setelah menekan tombol submit.</p>

      <select
        id="afterSubmitAction"
        value={action.type}
        onChange={(e) => onActionTypeChange(e.target.value as AfterSubmitActionType)}
        className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all ${focusRingClass}`}
      >
        <option value="payment_instructions">Halaman Instruksi Pembayaran</option>
        <option value="whatsapp_direct">Langsung ke WhatsApp (Chat Saja)</option>
        <option value="whatsapp_specific">Langsung ke Nomor WhatsApp Tertentu</option>
        <option value="landing_page">Landing Page Lainnya</option>
        <option value="self_hosted">Self Hosted Orderan / Invoice</option>
        <option value="custom_url">Custom URL</option>
      </select>

      <div className="mt-6 transition-opacity duration-500">
        {renderInputs()}
      </div>

      <VariablesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVariableSelect={handleVariableInsert}
      />
    </div>
  );
};

export default ActionConfigurator;
