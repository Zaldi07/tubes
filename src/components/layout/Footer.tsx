import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border-main bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">AxiomMath</span>
            </Link>
            <p className="text-sm text-text-secondary">
              Platform modern dan interaktif untuk belajar matematika diskrit. Terstruktur, mudah dipahami, dan dirancang untuk mahasiswa.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-text-main uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/#fitur" className="hover:text-primary transition-colors">Fitur</Link></li>
              <li><Link to="/#tentang" className="hover:text-primary transition-colors">Tentang</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-text-main uppercase tracking-wider">Materi</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Aljabar Boolean</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Kombinatorika</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Teori Graf</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-text-main uppercase tracking-wider">Bantuan</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Kontak</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border-main pt-8 text-center">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} AxiomMath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
