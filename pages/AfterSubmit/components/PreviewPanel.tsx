
import React from 'react';
import { SAMPLE_DATA } from '../constants';

interface Props {
  isVisible: boolean;
  content: string;
}

const PreviewPanel: React.FC<Props> = ({ isVisible, content }) => {
  const generatePreviewHtml = () => {
    let previewContent = content;

    // Replace variables with sample data
    for (const [key, value] of Object.entries(SAMPLE_DATA)) {
      const regex = new RegExp(key.replace(/[{}]/g, '\\$&'), 'g');
      previewContent = previewContent.replace(regex, `<span class="font-semibold text-[#8f60c9]">${value}</span>`);
    }

    // Replace remaining variables with a placeholder style
    previewContent = previewContent.replace(/{[a-zA-Z0-9_]+}/g, match => `<span class="text-slate-400">${match}</span>`);

    return previewContent;
  };
  
  if (!isVisible) return null;

  return (
    <div className="mt-10 lg:mt-0 transition-opacity duration-500">
      <div className="sticky top-8">
        <h2 className="text-lg font-semibold text-slate-700 mb-1">Pratinjau Live</h2>
        <p className="text-sm text-slate-500 mb-4">Tampilan halaman instruksi pembayaran Anda.</p>
        
        <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div
            className="p-8 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap min-h-[640px]"
            dangerouslySetInnerHTML={{ __html: generatePreviewHtml() }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
