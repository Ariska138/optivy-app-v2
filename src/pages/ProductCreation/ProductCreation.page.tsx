import React, { useState, useMemo, useCallback } from 'react';
import {
  type ProductFormData,
  type ProductFormField,
  type ProductCreationType,
  type FollowUpMessage,
  type PageType,
} from '../../types';
import {
  INITIAL_FORM_DATA,
  salesAgents,
  META_PIXEL_EVENTS,
  TIKTOK_PIXEL_EVENTS,
  GOOGLE_ANALYTICS_EVENTS,
} from '../../constants/productCreation';

import ProductCreationCard from './components/ProductCreationCard';
import ToggleSwitch from './components/ToggleSwitch';
import ProductCreationHeader from './components/ProductCreationHeader';
import ProductTypeSelection from './components/ProductTypeSelection';
import CheckoutPreview from './components/CheckoutPreview';
import { useNavigate } from 'react-router-dom';

// --- STYLES ---
const formInputClasses =
  'bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:outline-none focus:border-purple-600 transition duration-300 w-full py-3 px-1';

const ProductCreationPage = () => {
  const navigate = useNavigate();

  const [view, setView] = useState<'type-selection' | 'form'>('type-selection');
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);

  const handleProductTypeSelect = (type: ProductCreationType) => {
    if (type === 'digital') {
      setView('form');
    }
  };

  const handleInputChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      e: React.ChangeEvent<T>
    ) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      const numValue = value === '' ? '' : parseInt(value, 10);
      setFormData((prev) => ({ ...prev, [id]: numValue }));
    },
    []
  );

  const handleCheckoutChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      e: React.ChangeEvent<T>
    ) => {
      const { id, value, type } = e.target;
      const isCheckbox = type === 'checkbox';
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        checkout: {
          ...prev.checkout,
          [id]: isCheckbox ? checked : value,
        },
      }));
    },
    []
  );

  const handleTrustSymbolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        checkout: {
          ...prev.checkout,
          trustSymbols: {
            ...prev.checkout.trustSymbols,
            [id]: checked,
          },
        },
      }));
    },
    []
  );

  const handlePaymentMethodChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        checkout: {
          ...prev.checkout,
          paymentMethods: {
            ...prev.checkout.paymentMethods,
            [id]: checked,
          },
        },
      }));
    },
    []
  );

  const handleFormFieldChange = useCallback(
    (index: number, field: keyof ProductFormField, value: string | boolean) => {
      setFormData((prev) => {
        const newFields = [...prev.checkout.formFields];
        (newFields[index] as any)[field] = value;
        return {
          ...prev,
          checkout: { ...prev.checkout, formFields: newFields },
        };
      });
    },
    []
  );

  const handleMediaChange = useCallback((index: number, file: File | null) => {
    setFormData((prev) => {
      const newMedia = [...prev.checkout.media];
      if (file) {
        newMedia[index] = {
          ...newMedia[index],
          file,
          url: URL.createObjectURL(file),
        };
      }
      return {
        ...prev,
        checkout: { ...prev.checkout, media: newMedia },
      };
    });
  }, []);

  const addMedia = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      checkout: {
        ...prev.checkout,
        media: [
          ...prev.checkout.media,
          { id: Date.now(), file: null, url: '' },
        ],
      },
    }));
  }, []);

  const removeMedia = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      checkout: {
        ...prev.checkout,
        media: prev.checkout.media.filter((_, i) => i !== index),
      },
    }));
  }, []);

  const handleSalesTeamChange = useCallback(
    (index: number, percentage: number) => {
      setFormData((prev) => {
        const newSalesTeam = [...prev.salesTeam];
        newSalesTeam[index].percentage = percentage;
        return { ...prev, salesTeam: newSalesTeam };
      });
    },
    []
  );

  const addSalesPerson = useCallback(
    (name: string) => {
      if (name && !formData.salesTeam.find((p) => p.name === name)) {
        setFormData((prev) => ({
          ...prev,
          salesTeam: [...prev.salesTeam, { name, percentage: 0 }],
        }));
      }
    },
    [formData.salesTeam]
  );

  const removeSalesPerson = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      salesTeam: prev.salesTeam.filter((_, i) => i !== index),
    }));
  }, []);

  const totalPercentage = useMemo(() => {
    return formData.salesTeam.reduce((acc, curr) => acc + curr.percentage, 0);
  }, [formData.salesTeam]);

  const availableSalesAgents = useMemo(() => {
    const assignedNames = new Set(formData.salesTeam.map((p) => p.name));
    return salesAgents.filter((agent) => !assignedNames.has(agent));
  }, [formData.salesTeam]);

  const handleFollowUpEnabledChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        followUp: { ...prev.followUp, isEnabled: e.target.checked },
      }));
    },
    []
  );

  const handleFollowUpMessageChange = useCallback(
    (
      index: number,
      field: keyof FollowUpMessage | 'value' | 'time',
      value: string | number
    ) => {
      setFormData((prev) => {
        const newMessages = [...prev.followUp.messages];
        const message = { ...newMessages[index] };
        if (field === 'message') {
          message.message = value as string;
        } else if (field === 'value') {
          message.timing = { ...message.timing, value: value as number };
        } else if (field === 'time') {
          message.timing = { ...message.timing, time: value as string };
        }
        newMessages[index] = message;
        return {
          ...prev,
          followUp: { ...prev.followUp, messages: newMessages },
        };
      });
    },
    []
  );

  const handleTrackingChange = useCallback(
    (
      platform: 'meta' | 'tiktok' | 'google',
      field: 'id' | 'event',
      value: string
    ) => {
      setFormData((prev) => ({
        ...prev,
        tracking: {
          ...prev.tracking,
          [platform]: {
            ...prev.tracking[platform],
            [field]: value,
          },
        },
      }));
    },
    []
  );

  const sanitizedUrl = formData.checkout.customUrl
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const digitalProductForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate('/products/submitted');
      }}
      className="mt-10 animate-fade-in"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Product Info */}
          <ProductCreationCard>
            <h2 className="text-2xl font-bold mb-6">Informasi Produk</h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className={formInputClasses}
                  placeholder="Contoh: Ebook Panduan Lengkap"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className={formInputClasses}
                  placeholder="Jelaskan keunggulan produk Anda..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">
                  Aset Digital
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="assetFile"
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        assetFile: e.target.files?.[0] || null,
                      }))
                    }
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-600 hover:file:bg-purple-200 cursor-pointer"
                    title="Upload file produk (konten)"
                  />
                  <input
                    type="url"
                    id="assetUrl"
                    value={formData.assetUrl}
                    onChange={handleInputChange}
                    className={formInputClasses}
                    placeholder="Atau masukkan URL file aset"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Kamu hanya bisa melakukan upload 1 file (PDF, DOC, Gambar,
                  Video, ZIP, RAR, mp3) dengan maksimal ukuran 50mb.
                </p>
              </div>
            </div>
          </ProductCreationCard>

          {/* Price & Status */}
          <ProductCreationCard>
            <h2 className="text-2xl font-bold mb-6">Harga & Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="normalPrice"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  Harga Normal (Rp)
                </label>
                <input
                  type="number"
                  id="normalPrice"
                  value={formData.normalPrice}
                  onChange={handlePriceChange}
                  className={formInputClasses}
                  placeholder="250000"
                />
              </div>
              <div>
                <label
                  htmlFor="discountPrice"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  Harga Diskon (Rp)
                </label>
                <input
                  type="number"
                  id="discountPrice"
                  value={formData.discountPrice}
                  onChange={handlePriceChange}
                  className={formInputClasses}
                  placeholder="150000"
                />
              </div>
              <div>
                <label
                  htmlFor="productStatus"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  Status Produk
                </label>
                <select
                  id="productStatus"
                  value={formData.productStatus}
                  onChange={handleInputChange}
                  className={formInputClasses}
                >
                  <option value="active">Aktif</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </ProductCreationCard>

          {/* Checkout Page Customization */}
          <ProductCreationCard>
            <h2 className="text-2xl font-bold mb-6">
              Kustomisasi Halaman Checkout
            </h2>
            <div className="space-y-8">
              <div>
                <label
                  htmlFor="tagline"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  Judul (Tagline)
                </label>
                <input
                  type="text"
                  id="tagline"
                  value={formData.checkout.tagline}
                  onChange={handleCheckoutChange}
                  className={formInputClasses}
                  placeholder="Judul utama yang menarik"
                />
              </div>
              <div>
                <label
                  htmlFor="subheadline"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  Subheadline
                </label>
                <input
                  type="text"
                  id="subheadline"
                  value={formData.checkout.subheadline}
                  onChange={handleCheckoutChange}
                  className={formInputClasses}
                  placeholder="Teks pendukung di bawah judul"
                />
              </div>
              <div>
                <label
                  htmlFor="customUrl"
                  className="block text-sm font-semibold text-slate-600 mb-1"
                >
                  URL Halaman Checkout
                </label>
                <div className="flex items-center">
                  <span className="text-slate-500 text-sm">
                    yourdomain.com/
                  </span>
                  <input
                    type="text"
                    id="customUrl"
                    value={formData.checkout.customUrl}
                    onChange={handleCheckoutChange}
                    className={`${formInputClasses} flex-1 ml-1 !p-0`}
                    placeholder="produk-keren-saya"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  URL Final:{' '}
                  <strong className="text-purple-600">
                    yourdomain.com/{sanitizedUrl}
                  </strong>
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-3">
                  Media Produk (Foto/Video)
                </label>
                <div className="space-y-3">
                  {formData.checkout.media.map((media, index) => (
                    <div key={media.id} className="flex items-center gap-3">
                      <input
                        type="file"
                        onChange={(e) =>
                          handleMediaChange(index, e.target.files?.[0] || null)
                        }
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border file:border-slate-200 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-600 hover:file:bg-slate-100 cursor-pointer"
                      />
                      {formData.checkout.media.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="text-red-500 hover:text-red-700 font-bold text-xl"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addMedia}
                  className="mt-3 text-sm text-purple-600 font-semibold hover:underline"
                >
                  + Tambah Foto/Video
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-3">
                  Fitur Tambahan
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="showSummaryOrder"
                      checked={formData.checkout.showSummaryOrder}
                      onChange={handleCheckoutChange}
                    />
                    <span className="ml-3 text-sm">
                      Tampilkan Summary Order
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="useUniqueCode"
                      checked={formData.checkout.useUniqueCode}
                      onChange={handleCheckoutChange}
                    />
                    <span className="ml-3 text-sm">Aktifkan Kode Unik</span>
                    {formData.checkout.useUniqueCode && (
                      <div className="ml-4 flex items-center gap-2 text-sm">
                        <label>
                          <input
                            type="radio"
                            name="uniqueCodeOperator"
                            value="increase"
                            checked={
                              formData.checkout.uniqueCodeOperator ===
                              'increase'
                            }
                            onChange={handleCheckoutChange}
                            className="mr-1"
                          />{' '}
                          (+)
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="uniqueCodeOperator"
                            value="decrease"
                            checked={
                              formData.checkout.uniqueCodeOperator ===
                              'decrease'
                            }
                            onChange={handleCheckoutChange}
                            className="mr-1"
                          />{' '}
                          (-)
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="showOfficialLogo"
                      checked={formData.checkout.showOfficialLogo}
                      onChange={handleCheckoutChange}
                    />
                    <span className="ml-3 text-sm">
                      Tampilkan Logo Official
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-3">
                  Segel Penambah Kepercayaan
                </label>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="guarantee"
                      checked={formData.checkout.trustSymbols.guarantee}
                      onChange={handleTrustSymbolChange}
                    />
                    <span className="ml-3 text-sm">Garansi 30 Hari</span>
                  </div>
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="securePayment"
                      checked={formData.checkout.trustSymbols.securePayment}
                      onChange={handleTrustSymbolChange}
                    />
                    <span className="ml-3 text-sm">Pembayaran Aman</span>
                  </div>
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="ssl"
                      checked={formData.checkout.trustSymbols.ssl}
                      onChange={handleTrustSymbolChange}
                    />
                    <span className="ml-3 text-sm">Enkripsi SSL</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-3">
                  Metode Pembayaran
                </label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="bankTransfer"
                      checked={formData.checkout.paymentMethods.bankTransfer}
                      onChange={handlePaymentMethodChange}
                    />
                    <span className="ml-3 text-sm">Bank Transfer</span>
                  </div>
                  <div className="flex items-center">
                    <ToggleSwitch
                      id="ePayment"
                      checked={formData.checkout.paymentMethods.ePayment}
                      onChange={handlePaymentMethodChange}
                    />
                    <span className="ml-3 text-sm">Semua E-payment</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-3">
                  Field Formulir Pemesanan
                </label>
                <div className="space-y-4">
                  {formData.checkout.formFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="space-y-2 p-3 rounded-lg bg-slate-50/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ToggleSwitch
                            checked={field.isActive}
                            onChange={(e) =>
                              handleFormFieldChange(
                                index,
                                'isActive',
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-3 text-sm font-medium text-slate-700">
                            {field.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-3 text-xs font-semibold text-slate-500">
                            Required
                          </span>
                          <ToggleSwitch
                            checked={field.isRequired}
                            onChange={(e) =>
                              handleFormFieldChange(
                                index,
                                'isRequired',
                                e.target.checked
                              )
                            }
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          handleFormFieldChange(index, 'label', e.target.value)
                        }
                        className={`${formInputClasses} !py-1 text-sm bg-white/50`}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-4 text-sm text-purple-600 font-semibold hover:underline"
                >
                  + Tambah Field Kustom
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-3">
                  Tombol Pemesanan
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    id="buttonText"
                    value={formData.checkout.buttonText}
                    onChange={handleCheckoutChange}
                    className={formInputClasses}
                  />
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      id="buttonColor"
                      value={formData.checkout.buttonColor}
                      onChange={handleCheckoutChange}
                      className="w-10 h-10 border-none cursor-pointer rounded-full p-0"
                    />
                    <span className="text-sm">Pilih Warna Tombol</span>
                  </div>
                </div>
              </div>
            </div>
          </ProductCreationCard>

          {/* Follow Up Automation */}
          <ProductCreationCard>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/50">
              <h2 className="text-2xl font-bold">Otomatisasi Follow Up</h2>
              <ToggleSwitch
                checked={formData.followUp.isEnabled}
                onChange={handleFollowUpEnabledChange}
              />
            </div>
            <div
              className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${
                formData.followUp.isEnabled ? 'max-h-[2000px]' : 'max-h-0'
              }`}
            >
              <div className="space-y-6 pt-6">
                {formData.followUp.messages.map((msg, index) => (
                  <div key={msg.id} className="p-3 rounded-lg bg-slate-50/50">
                    <h3 className="text-base font-semibold text-slate-700 mb-2">
                      {msg.title}
                    </h3>
                    <textarea
                      className={`${formInputClasses} bg-white/50`}
                      rows={3}
                      placeholder={`Isi ${msg.title.toLowerCase()} di sini...`}
                      value={msg.message}
                      onChange={(e) =>
                        handleFollowUpMessageChange(
                          index,
                          'message',
                          e.target.value
                        )
                      }
                    ></textarea>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-slate-600 text-sm">
                        {msg.timing.unit === 'days'
                          ? `Hari ke-`
                          : 'Kirim setelah'}
                      </span>
                      <input
                        type="number"
                        className={`${formInputClasses} w-16 text-center !p-1`}
                        value={msg.timing.value}
                        onChange={(e) =>
                          handleFollowUpMessageChange(
                            index,
                            'value',
                            +e.target.value
                          )
                        }
                        min="0"
                      />
                      {msg.timing.unit === 'days' ? (
                        <input
                          type="time"
                          className={`${formInputClasses} flex-1 !p-1`}
                          value={msg.timing.time}
                          onChange={(e) =>
                            handleFollowUpMessageChange(
                              index,
                              'time',
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <span className="text-slate-600 text-sm">menit</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ProductCreationCard>

          {/* Tracking */}
          <ProductCreationCard>
            <h2 className="text-2xl font-bold mb-6">Tracking Pixel & Events</h2>
            <div className="space-y-6">
              {(['meta', 'tiktok', 'google'] as const).map((platform) => {
                const events =
                  platform === 'meta'
                    ? META_PIXEL_EVENTS
                    : platform === 'tiktok'
                    ? TIKTOK_PIXEL_EVENTS
                    : GOOGLE_ANALYTICS_EVENTS;
                const label =
                  platform === 'meta'
                    ? 'Meta'
                    : platform === 'tiktok'
                    ? 'TikTok'
                    : 'Google Analytics';
                const placeholder =
                  platform === 'google'
                    ? 'GA Measurement ID (G-...)'
                    : `ID ${label} Pixel`;
                return (
                  <div key={platform}>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">
                      {label} Pixel
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        className={formInputClasses}
                        placeholder={placeholder}
                        value={formData.tracking[platform].id}
                        onChange={(e) =>
                          handleTrackingChange(platform, 'id', e.target.value)
                        }
                      />
                      <select
                        className={formInputClasses}
                        value={formData.tracking[platform].event}
                        onChange={(e) =>
                          handleTrackingChange(
                            platform,
                            'event',
                            e.target.value
                          )
                        }
                      >
                        <option value="">Pilih Event</option>
                        {events.map((event) => (
                          <option key={event} value={event}>
                            {event}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </ProductCreationCard>

          {/* Sales Team */}
          <ProductCreationCard>
            <h2 className="text-2xl font-bold mb-6">Tim Sales</h2>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-3">
                Pilih CS & Atur Leads
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <select
                  id="cs-dropdown"
                  className={`${formInputClasses} flex-1`}
                  defaultValue=""
                >
                  <option value="">Pilih CS...</option>
                  {availableSalesAgents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    addSalesPerson(
                      (
                        document.getElementById(
                          'cs-dropdown'
                        ) as HTMLSelectElement
                      ).value
                    )
                  }
                  className="bg-purple-600 text-white rounded-lg h-10 w-10 font-bold text-lg hover:bg-purple-700 transition"
                >
                  +
                </button>
              </div>
              <div className="space-y-3">
                {formData.salesTeam.map((person, index) => (
                  <div key={person.name} className="flex items-center gap-3">
                    <label className="w-16 text-sm text-slate-700">
                      {person.name}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={person.percentage}
                      onChange={(e) =>
                        handleSalesTeamChange(index, +e.target.value)
                      }
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={person.percentage}
                      onChange={(e) =>
                        handleSalesTeamChange(index, +e.target.value)
                      }
                      className={`${formInputClasses} w-20 text-center !py-1`}
                    />
                    <button
                      type="button"
                      onClick={() => removeSalesPerson(index)}
                      className="text-red-400 hover:text-red-600 text-xl font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/50 font-semibold">
                Total:{' '}
                <span
                  className={
                    totalPercentage === 100 ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {totalPercentage}%
                </span>
              </div>
            </div>
          </ProductCreationCard>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <CheckoutPreview formData={formData} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          className="text-white font-bold py-4 px-12 rounded-full text-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300"
        >
          <i className="fa-solid fa-arrow-right mr-2"></i>
          Simpan & Lanjutkan
        </button>
      </div>
    </form>
  );

  return (
    <div className="h-full w-full text-slate-800 bg-[linear-gradient(120deg,#f9f7fd_0%,#eef2f9_100%)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <ProductCreationHeader onBack={() => navigate('/products')} />
      {view === 'type-selection' ? (
        <ProductTypeSelection onSelect={handleProductTypeSelect} />
      ) : (
        digitalProductForm
      )}
    </div>
  );
};

export default ProductCreationPage;

