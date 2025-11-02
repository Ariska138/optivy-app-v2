import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bagian Kiri: Logo dan Deskripsi */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/icon-192x192.png" // Gunakan logo Optivy.co versi putih
                alt="Optivy.co Logo"
                className="h-9 w-9"
              />
              <span className="text-xl font-bold text-white">Optivy.co</span>
            </div>
            <p className="text-slate-400 text-base max-w-sm">
              Platform pembuatan landing page tercepat dan termudah dengan
              bantuan AI untuk meluncurkan ide Anda.
            </p>
          </div>

          {/* Bagian Kanan: Link Navigasi */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Produk</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Harga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Template
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrasi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Perusahaan</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontak
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Karir
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Hubungi Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a
                    href="mailto:support@optivy.co"
                    className="hover:text-white transition-colors"
                  >
                    support@optivy.co
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bawah: Copyright dan Social Media */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} Optivy.co. Semua hak dilindungi.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a
              href="#"
              aria-label="Twitter"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
