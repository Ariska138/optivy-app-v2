import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/card';
import { Button } from './components/button';
import {
  LayoutTemplate,
  CheckCircle,
  Zap,
  Bot,
  BarChart,
  Rocket,
} from 'lucide-react';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-800 pb-20 md:pb-0">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/icon-192x192.png" // Ganti dengan logo SaaS Anda
              alt="Optivy Logo"
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Optivy.co
            </h1>
          </div>
          <Button
            size="sm"
            className="h-9 px-4 font-semibold bg-gray-800 hover:bg-gray-700 text-white md:h-10 md:px-6"
            onClick={() => navigate('/login', { replace: true })}
          >
            Sign In
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-24 space-y-16 md:space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tighter">
              Buat Landing Page Menakjubkan{' '}
              <span className="text-indigo-600">dalam Hitungan Menit</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Tanpa perlu coding. Cukup drag-and-drop, dan biarkan AI kami
              membantu Anda menciptakan halaman yang menjual.
            </p>
          </div>
          <Button
            size="lg"
            className="h-12 px-8 text-white text-lg font-bold shadow-lg bg-indigo-600 hover:bg-indigo-700 transition-transform transform hover:scale-105"
            onClick={() => navigate('/register')}
          >
            <Rocket className="h-6 w-6 mr-3" />
            Mulai Gratis
          </Button>
        </section>

        {/* Fitur Unggulan */}
        <section className="space-y-10">
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Fitur Unggulan Kami
            </h3>
            <p className="text-lg md:text-xl text-gray-600">
              Semua yang Anda butuhkan untuk konversi tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Desain Intuitif */}
            <Card className="border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300">
              <CardHeader className="items-center text-center p-6">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <LayoutTemplate className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Desain Intuitif
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Editor drag-and-drop',
                    'Ratusan template siap pakai',
                    'Antarmuka ramah pemula',
                    'Publikasikan dengan 1 klik',
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Card 2: Generator AI */}
            <Card className="border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300">
              <CardHeader className="items-center text-center p-6">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <Bot className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Generator Konten AI
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Buat headline menarik',
                    'Tulis deskripsi produk',
                    'Saran copywriting cerdas',
                    'Hemat waktu penulisan',
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Card 3: Performa Cepat */}
            <Card className="border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300">
              <CardHeader className="items-center text-center p-6">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Super Cepat & Responsif
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Hosting global (CDN)',
                    'Optimalisasi gambar otomatis',
                    'Tampilan di semua perangkat',
                    'Skor PageSpeed tinggi',
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Card 4: Analitik */}
            <Card className="border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300">
              <CardHeader className="items-center text-center p-6">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <BarChart className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Analitik & Integrasi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Lacak pengunjung & konversi',
                    'Integrasi Google Analytics',
                    'Hubungkan email marketing',
                    'Formulir kontak instan',
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 sm:p-12 md:p-16 rounded-2xl shadow-xl">
          <h3 className="text-3xl sm:text-4xl font-bold">
            Siap Meluncurkan Ide Anda?
          </h3>
          <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto">
            Mulai bangun landing page profesional Anda hari ini. Tanpa risiko,
            tanpa perlu kartu kredit.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-12 px-8 text-lg font-bold bg-white text-indigo-600 hover:bg-gray-100 transition-transform transform hover:scale-105"
            onClick={() => navigate('/register')}
          >
            Coba Gratis Sekarang
          </Button>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile bottom bar CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur border-t shadow-lg px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <Button
          // onClick={() => navigate('/register')}
          className="w-full h-12 font-bold text-white bg-indigo-600 hover:bg-indigo-700 text-base"
        >
          <Rocket className="h-5 w-5 mr-2" />
          Mulai Gratis
        </Button>
      </div>
    </div>
  );
}
