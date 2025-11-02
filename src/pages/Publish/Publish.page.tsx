import React, { useState } from 'react';
import { PageType } from '@/types';
import {
  ArrowLeft,
  CheckCircle,
  Globe,
  Image as ImageIcon,
  Send,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cardClasses =
  'bg-white/60 backdrop-blur-[15px] border border-white/20 shadow-lg shadow-purple-900/10 rounded-2xl p-8';
const formInputClasses =
  'bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:outline-none focus:border-purple-600 transition duration-300 w-full py-3 px-1';

const PublishPage = () => {
  const navigate = useNavigate();

  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [favicon, setFavicon] = useState<File | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState(
    'zaenal-suep.optivy.net'
  );
  const [path, setPath] = useState('');

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFavicon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sanitizedPath = path
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return (
    <div className="h-full w-full text-slate-800 bg-[linear-gradient(120deg,#f9f7fd_0%,#eef2f9_100%)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <header className="mb-10 text-center relative">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
          Final Setup & Publish
        </h1>
        <p className="text-slate-500 mt-2">
          Just a few more steps before your page goes live!
        </p>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        {/* SEO Settings */}
        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-6">SEO Settings</h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="seoTitle"
                className="block text-sm font-semibold text-slate-600 mb-1"
              >
                Page Title
              </label>
              <input
                type="text"
                id="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className={formInputClasses}
                placeholder="e.g., My Awesome Product"
              />
            </div>
            <div>
              <label
                htmlFor="metaDescription"
                className="block text-sm font-semibold text-slate-600 mb-1"
              >
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className={formInputClasses}
                placeholder="A short, compelling description for search engines."
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="favicon"
                className="block text-sm font-semibold text-slate-600 mb-2"
              >
                Favicon
              </label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                  {faviconPreview ? (
                    <img
                      src={faviconPreview}
                      alt="Favicon Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="text-slate-400" />
                  )}
                </div>
                <input
                  type="file"
                  id="favicon"
                  onChange={handleFaviconChange}
                  accept="image/png, image/jpeg, image/x-icon"
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-600 hover:file:bg-purple-200 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Domain & Path */}
        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-6">Domain & Path</h2>
          <div>
            <label
              htmlFor="domain"
              className="block text-sm font-semibold text-slate-600 mb-1"
            >
              Domain
            </label>
            <div className="relative">
              <Globe
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <select
                id="domain"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className={`${formInputClasses} !pl-9 appearance-none`}
              >
                <option value="zaenal-suep.optivy.net">
                  zaenal-suep.optivy.net (Default)
                </option>
                <option value="toko-keren.com">toko-keren.com</option>
                <option value="bisnis-saya.id">bisnis-saya.id</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="path"
              className="block text-sm font-semibold text-slate-600 mb-1"
            >
              Path
            </label>
            <div className="flex items-center">
              <span className="text-slate-500 text-sm">{selectedDomain}/</span>
              <input
                type="text"
                id="path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className={`${formInputClasses} flex-1 ml-1 !p-0`}
                placeholder="produk-baru"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Final URL:{' '}
              <strong className="text-purple-600">
                {selectedDomain}/{sanitizedPath}
              </strong>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/products/page-builder')}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Editor
          </button>
          <button
            onClick={() => {
              alert('Page published successfully!');
              navigate('/products');
            }}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-500/30"
          >
            <Send size={18} />
            Publish Page
          </button>
        </div>
      </main>
    </div>
  );
};

export default PublishPage;
